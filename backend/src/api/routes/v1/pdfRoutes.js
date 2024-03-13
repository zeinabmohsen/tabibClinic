const express = require('express');
const router = express.Router();
const { createMedicalRecord , createPrescription } = require('../../controllers/pdfController');

// Route to create a medical record
router.post('/records/:patientId', createMedicalRecord);
router.post('/prescription/:patientId', createPrescription);

module.exports = router;
