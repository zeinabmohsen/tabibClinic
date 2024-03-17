const express = require("express");
const router = express.Router();
const {
  createPatientValidator,
  deletePatientValidator,
  getPatientValidator,
  updatePatientValidator,
} = require("../../utils/validators/patientValidator");
const {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatientById,
  deletePatientById,
  getPatientsByDoctorId
} = require("../../controllers/patientController");

// Route to create a new patient
router.post("/", createPatientValidator, createPatient);

// Route to get all patients
router.get("/", getAllPatients);

// Route to get a specific patient by ID
router.get("/:id", getPatientValidator, getPatientById);

// Route to update a specific patient by ID
router.put("/:id", updatePatientValidator, updatePatientById);

// Route to delete a specific patient by ID
router.delete("/:id", deletePatientValidator, deletePatientById);

router.get("/doctor/:doctorId", getPatientsByDoctorId);

module.exports = router;
