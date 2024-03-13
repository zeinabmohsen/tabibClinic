const { check } = require("express-validator");
const validatorMiddleware = require("../../middleware/validatorMiddleware");
const Appointment = require("../../models/appointment.model");

exports.createAppointmentValidator = [
  check("doctor")
    .notEmpty()
    .withMessage("Doctor is required")
    .isMongoId()
    .withMessage("Invalid doctor ID format"),
  check("patient")
    .if((value, { req }) => !req.body.newPatient)
    .notEmpty()
    .withMessage("Patient is required")
    .isMongoId()
    .withMessage("Invalid patient ID format"),
check("newPatient")
    .if((value, { req }) => !req.body.patient) 
    .notEmpty()
    .withMessage("New patient is required")
    .isBoolean()
    .withMessage("Invalid new patient format"),
  check("invoice")
    .optional()
    .isMongoId()
    .withMessage("Invalid invoice ID format"),
  check("start")
    .notEmpty()
    .withMessage("Start time is required")
    .isISO8601()
    .withMessage("Invalid start time format"),
  check("end")
    .notEmpty()
    .withMessage("End time is required")
    .isISO8601()
    .withMessage("Invalid end time format"),
  check("reason").optional().isString().withMessage("Reason must be a string"),
  validatorMiddleware,
];

exports.getAppointmentValidator = [
  check("id").isMongoId().withMessage("Invalid appointment ID format"),
  validatorMiddleware,
];

exports.updateAppointmentValidator = [
  check("id").isMongoId().withMessage("Invalid appointment ID format"),
  check("doctor")
    .optional()
    .isMongoId()
    .withMessage("Invalid doctor ID format"),
  check("patient")
    .optional()
    .isMongoId()
    .withMessage("Invalid patient ID format"),
  check("invoice")
    .optional()
    .isMongoId()
    .withMessage("Invalid invoice ID format"),
  check("start")
    .optional()
    .isISO8601()
    .withMessage("Invalid start time format"),
  check("end").optional().isISO8601().withMessage("Invalid end time format"),
  check("reason").optional().isString().withMessage("Reason must be a string"),
  validatorMiddleware,
];

exports.deleteAppointmentValidator = [
  check("id").isMongoId().withMessage("Invalid appointment ID format"),
  validatorMiddleware,
];

exports.getAppointmentByDoctorValidator = [
  check("id").isMongoId().withMessage("Invalid doctor ID format"),
  validatorMiddleware,
];

exports.getAppointmentByPatientValidator = [
  check("id").isMongoId().withMessage("Invalid patient ID format"),
  validatorMiddleware,
];

exports.updateAppointmentStatusValidator = [
  check("id").isMongoId().withMessage("Invalid appointment ID format"),
  check("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(Appointment.statuses)
    .withMessage("Invalid status"),
  validatorMiddleware,
];

exports.getAllAppointmentsValidator = [validatorMiddleware];
