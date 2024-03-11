const { check, body } = require('express-validator');
const User = require('../../models/user.model');
const bcrypt = require('bcrypt');
const validatorMiddleware = require('../../middleware/validatorMiddleware');

exports.createUserValidator = [
  check('firstName')
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ min: 3 })
    .withMessage('First name must be at least 3 characters'),

  check('lastName')
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ min: 3 })
    .withMessage('Last name must be at least 3 characters'),

  // check('email')
  //   .notEmpty()
  //   .withMessage('Email is required')
  //   .isEmail()
  //   .withMessage('Invalid email address')
  //   .custom((val) =>
  //     User.findOne({ email: val }).then((user) => {
  //       if (user) {
  //         return Promise.reject(new Error('Email already exists'));
  //       }
  //     })
  //   ),

  check('phone')
    .notEmpty()
    .withMessage('Phone number is required')
    .isMobilePhone()
    .withMessage('Invalid phone number'),

  check('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),

  validatorMiddleware,
];

exports.updateUserValidator = [
  check('userId')
    .notEmpty()
    .withMessage('User ID is required')
    .isMongoId()
    .withMessage('Invalid user ID format'),

  body('firstName')
    .optional()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ min: 3 })
    .withMessage('First name must be at least 3 characters'),

  body('lastName')
    .optional()
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ min: 3 })
    .withMessage('Last name must be at least 3 characters'),

  body('email')
    .optional()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address')
    .custom(async (value, { req }) => {
      const user = await User.findOne({ email: value });
      if (user && user._id.toString() !== req.params.userId) {
        throw new Error('Email already exists');
      }
    }),

  body('phone')
    .optional()
    .notEmpty()
    .withMessage('Phone number is required')
    .isMobilePhone()
    .withMessage('Invalid phone number'),

  validatorMiddleware,
];

exports.deleteUserValidator = [
  check('userId')
    .notEmpty()
    .withMessage('User ID is required')
    .isMongoId()
    .withMessage('Invalid user ID format'),

  validatorMiddleware,
];

exports.getUserByIdValidator = [
    check('userId')
      .notEmpty()
      .withMessage('User ID is required')
      .isMongoId()
      .withMessage('Invalid user ID format')
  ];
  

exports.changePasswordValidator = [
  check('userId')
    .notEmpty()
    .withMessage('User ID is required')
    .isMongoId()
    .withMessage('Invalid user ID format'),

  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),

  body('newPassword')
    .notEmpty()
    .withMessage('New password is required')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters'),

  body('confirmPassword')
    .notEmpty()
    .withMessage('Confirm password is required')
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),

  validatorMiddleware,
];
