const { check } = require("express-validator");
const validatorMiddleware = require("../../middleware/validatorMiddleware");

exports.loginValidator = [
    check('email')
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Invalid email address'),
    check('password')
      .notEmpty()
      .withMessage('Password is required'),
    validatorMiddleware 
];
