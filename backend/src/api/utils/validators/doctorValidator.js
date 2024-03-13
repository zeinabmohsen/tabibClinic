const { check } = require('express-validator');
const validatorMiddleware = require('../../middleware/validatorMiddleware');
const User = require('../../models/user.model');

exports.createDoctorValidator = [
  check('firstName')
    .notEmpty()
    .withMessage('First name is required'),
  check('lastName')
    .notEmpty()
    .withMessage('Last name is required'),
  check('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address')
    .custom((value) => {
      return User.findOne({ email: value }).then((user) => {
        if (user) {
          return Promise.reject('Email already in use');
        }
      });
    }),
  check('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  check('phone')
    .notEmpty()
    .withMessage('Phone number is required'),
  validatorMiddleware,
];

exports.getDoctorValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid doctor ID format'),
  validatorMiddleware,
];

exports.updateDoctorValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid doctor ID format'),
  check('email')
    .optional()
    .isEmail()
    .withMessage('Invalid email address')
    .custom((value, { req }) => {
      return User.findOne({ email: value }).then((user) => {
        if (user && user.id !== req.params.id) {
          return Promise.reject('Email already in use');
        }
      });
    }),
  validatorMiddleware,
];

exports.deleteDoctorValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid doctor ID format'),
  validatorMiddleware,
];
