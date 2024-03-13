const express = require('express');
const {createPrescription,uploadRecordAttach,deletePrescription,getPrescriptionById,updatePrescription  ,getPrescriptionsByPatientId} = require('../../controllers/prescpritionController')
const router = express.Router();

router.post('/:patientId' ,uploadRecordAttach, createPrescription);
router.delete('/:prescriptionId', deletePrescription);

// Get prescription by ID route
router.get('/:prescriptionId', getPrescriptionById);
router.put('/:prescriptionId', updatePrescription);
router.get('/patient/:patientId', getPrescriptionsByPatientId);




module.exports = router;
