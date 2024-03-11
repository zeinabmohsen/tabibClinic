const { check } = require('express-validator');
const validatorMiddleware = require('../../middleware/validatorMiddleware');
const Invoice = require('../../models/invoice.model');

exports.createInvoiceValidator = [
  check('doctorId')
    .notEmpty()
    .withMessage('Doctor ID is required'),
  check('patientId')
    .notEmpty()
    .withMessage('Patient ID is required'),
  check('amount')
    .notEmpty()
    .withMessage('Amount is required')
    .isNumeric()
    .withMessage('Amount must be a number'),
  check('currency')
    .notEmpty()
    .withMessage('Currency is required'),
  validatorMiddleware,
];

exports.getInvoiceValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid invoice ID format'),
  validatorMiddleware,
];

exports.updateInvoiceValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid invoice ID format'),
  check('amount')
    .optional()
    .isNumeric()
    .withMessage('Amount must be a number'),
  validatorMiddleware,
];