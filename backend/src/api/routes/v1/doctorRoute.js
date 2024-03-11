const express = require('express');
const router = express.Router();
const {createDoctorValidator}=require('../../utils/validators/doctorValidator');
const {
  addDoctor,
  deleteDoctorById,
  getAllDoctors,
  getDoctorById,
  updateDoctorById,
} = require('../../controllers/doctorController');

// Route to add a new doctor
router.post('/', createDoctorValidator ,addDoctor);

// Route to get all doctors
router.get('/', getAllDoctors);

// Route to get a specific doctor by ID
router.get('/:id', getDoctorById);

// Route to update a specific doctor by ID
router.put('/:id', updateDoctorById);

// Route to delete a specific doctor by ID
router.delete('/:id', deleteDoctorById);

module.exports = router;

