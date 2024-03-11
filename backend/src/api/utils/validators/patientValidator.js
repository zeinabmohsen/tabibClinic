const { check } = require("express-validator");
const validatorMiddleware = require("../../middleware/validatorMiddleware");

exports.createPatientValidator = [
  check("firstName").notEmpty().withMessage("First name is required"),
  check("lastName").notEmpty().withMessage("Last name is required"),
  check("phone").notEmpty().withMessage("Phone number is required"),
  validatorMiddleware,
];

exports.getPatientValidator = [
  check("id").isMongoId().withMessage("Invalid patient ID format"),
  validatorMiddleware,
];

exports.updatePatientValidator = [
  check("id").isMongoId().withMessage("Invalid patient ID format"),
  validatorMiddleware,
];

exports.deletePatientValidator = [
  check("id").isMongoId().withMessage("Invalid patient ID format"),
  validatorMiddleware,
];
