const Prescription = require("../models/prescriptionSchema");
const Patient = require("../models/patientSchema");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const MedicalRecord = require("../models/medicalRecords");

const storage = multer.diskStorage({
  destination: "uploads/prescription",
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    const filename = `prescription-${uuidv4()}-${Date.now()}.${ext}`;
    cb(null, filename);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith("image/") ||
    file.mimetype === "application/pdf" ||
    file.mimetype === "application/msword"
  ) {
    cb(null, true); // Allow image, PDF, and DOC files
  } else {
    cb(new Error("Only Images, PDFs, and DOCs Allowed"), false);
  }
};

const uploadImage = multer({ storage, fileFilter });
const uploadRecordAttach = uploadImage.single("attachment");

const createPrescription = async (req, res) => {
  try {
    const { patientId } = req.params;
    const {
      medication,
      dosage,
      instructions,
      title,
      attachment,
      medicalRecordId,
    } = req.body;

    if (!attachment) {
      return res.status(400).json({ message: "Attachment is required" });
    }

    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    const medicalRecord = await MedicalRecord.findById(medicalRecordId);
    if (!medicalRecord) {
      return res.status(404).json({ message: "Medical Record not found" });
    }

    const prescriptionData = {
      patient: patientId,
      title: title,
      attachment,
      medicalRecord: medicalRecordId,
    };

    const newPrescription = new Prescription(prescriptionData);
    await newPrescription.save();

    medicalRecord.prescriptions.push(newPrescription._id);
    await medicalRecord.save();

    res.status(201).json(newPrescription);
  } catch (error) {
    console.error("Error creating prescription:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const deletePrescription = async (req, res) => {
  try {
    const { prescriptionId } = req.params;
    const deletedPrescription = await Prescription.findByIdAndDelete(
      prescriptionId
    );

    if (!deletedPrescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    const medicalRecord = await MedicalRecord.findById(
      deletedPrescription.medicalRecord
    );

    if (!medicalRecord) {
      return res.status(404).json({ message: "Medical Record not found" });
    }

    medicalRecord.prescriptions = medicalRecord.prescriptions.filter(
      (prescription) => prescription._id !== prescriptionId
    );
    await medicalRecord.save();

    res.status(200).json({ message: "Prescription deleted successfully" });
  } catch (error) {
    console.error("Error deleting prescription:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getPrescriptionById = async (req, res) => {
  try {
    const { prescriptionId } = req.params;
    const prescription = await Prescription.findById(prescriptionId);

    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    res.status(200).json(prescription);
  } catch (error) {
    console.error("Error getting prescription by ID:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
const getPrescriptionsByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;

    const prescriptions = await Prescription.find({ patient: patientId });

    if (!prescriptions || prescriptions.length === 0) {
      return res
        .status(404)
        .json({ message: "Prescriptions not found for the patient." });
    }

    console.log("Prescriptions retrieved successfully:", prescriptions);
    res.status(200).json(prescriptions);
  } catch (error) {
    console.error("Error retrieving prescriptions:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
const updatePrescription = async (req, res) => {
  try {
    const { prescriptionId } = req.params;
    const { medication, dosage, instructions, title } = req.body;

    if (!medication && !req.file) {
      return res
        .status(400)
        .json({ message: "Medication or attachment is required" });
    }

    let attachment = null;
    if (req.file) {
      attachment = `/uploads/prescription/${req.file.filename}`;
    }

    const prescriptionData = {
      title: title,
      attachment: attachment,
    };

    const updatedPrescription = await Prescription.findByIdAndUpdate(
      prescriptionId,
      prescriptionData,
      { new: true }
    );

    if (!updatedPrescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    console.log("Prescription updated successfully:", updatedPrescription);
    res.status(200).json(updatedPrescription);
  } catch (error) {
    console.error("Error updating prescription:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createPrescription,
  uploadRecordAttach,
  deletePrescription,
  getPrescriptionById,
  updatePrescription,
  getPrescriptionsByPatientId,
};
