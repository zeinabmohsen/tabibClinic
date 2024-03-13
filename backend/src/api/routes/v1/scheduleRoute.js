const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const {
  createDoctorScheduleValidator,
  updateDoctorScheduleValidator,
  deleteDoctorScheduleValidator,
} = require('../../utils/validators/scheduleValidator');
const {
  createDoctorSchedule,
  getDoctorSchedule,
  updateDoctorSchedule,
  deleteDoctorSchedule,
} = require('../../controllers/scheduleController');

// Route for creating a doctor schedule
router.post('/:doctorId', createDoctorScheduleValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    await createDoctorSchedule(req, res);
  } catch (error) {
    console.error("Error creating doctor schedule:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route for getting schedules for a specific doctor
router.get('/:doctorId', getDoctorSchedule);

// Route for updating a doctor schedule
router.put('/:doctorId/:scheduleId', updateDoctorScheduleValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    await updateDoctorSchedule(req, res);
  } catch (error) {
    console.error("Error updating doctor schedule:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route for deleting a specific doctor's schedule
router.delete('/:doctorId/:scheduleId', deleteDoctorScheduleValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    await deleteDoctorSchedule(req, res);
  } catch (error) {
    console.error("Error deleting doctor schedule:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
