const MedicalRecord = require("../models/medicalRecords");
const Prescription = require("../models/prescriptionSchema");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const mongoose = require("mongoose");

// Multer storage configuration for attachments
const attachmentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/attach"); // Set destination folder for attachment files
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Extract file extension
    const filename = `attach-${uuidv4()}${ext}`; // Generate unique filename
    cb(null, filename); // Callback with the generated filename
  },
});

// Multer storage configuration for prescriptions
const prescriptionStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/prescription"); // Set destination folder for prescription files
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Extract file extension
    const filename = `prescription-${uuidv4()}${ext}`; // Generate unique filename
    cb(null, filename); // Callback with the generated filename
  },
});

// Multer file filter for allowed file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "application/pdf",
    "application/msword",
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Allow specified file types
  } else {
    cb(new Error("Only Images (JPEG, PNG), PDFs, and DOCs Allowed"));
  }
};

// Configure multer middleware for attachments
const uploadAttachment = multer({
  storage: attachmentStorage,
  fileFilter: fileFilter,
}).single("attachment");

// Configure multer middleware for prescriptions
const uploadPrescription = multer({
  storage: prescriptionStorage,
  fileFilter: fileFilter,
}).single("attachment");

const createMedicalRecord = async (req, res) => {
  try {
    const { title, description } = req.body;
    const { patientId } = req.params;

    const medicalRecordData = {
      patient: patientId,
      title,
      description,
      date: Date.now(),
    };

    const newMedicalRecord = new MedicalRecord(medicalRecordData);
    await newMedicalRecord.save();

    console.log("Medical record created successfully:", newMedicalRecord);

    res.status(201).json({
      message: "Medical record created successfully",
      medicalRecord: newMedicalRecord,
    });
  } catch (error) {
    console.error("Error creating medical record:", error);
    res.status(500).json({ message: "Failed to create medical record" });
  }
};

// Function to add fees to a medical record
const addFeesToMedicalRecord = async (req, res) => {
  try {
    const { medicalRecordId } = req.params;
    const { fees } = req.body;

    const updatedMedicalRecord = await MedicalRecord.findByIdAndUpdate(
      medicalRecordId,
      { $set: { fees: fees } },
      { new: true }
    );

    console.log("Fees added to medical record:", updatedMedicalRecord);
    res.status(200).json(updatedMedicalRecord);
  } catch (error) {
    console.error("Error adding fees to medical record:", error);
    res.status(500).json({ message: "Failed to add fees to medical record" });
  }
};

// Function to add prescriptions to a medical record
const addPrescriptionsToMedicalRecord = async (req, res) => {
  try {
    const { medicalRecordId } = req.params;
    const { title, attachment } = req.body;

    // Create a new prescription
    const newPrescription = new Prescription({
      title: title,
      attachment: attachment,
      medicalRecord: medicalRecordId,
    });

    // Save the prescription
    const savedPrescription = await newPrescription.save();

    await MedicalRecord.findByIdAndUpdate(
      medicalRecordId,
      { $push: { prescriptions: savedPrescription._id } },
      { new: true }
    );

    res.status(200).json({
      message: "Prescription added to medical record",
      prescription: savedPrescription,
    });
  } catch (error) {
    console.error("Error adding prescription to medical record:", error);
    res
      .status(500)
      .json({ message: "Failed to add prescription to medical record" });
  }
};
// Function to upload attachment to a specific medical record
const uploadAttachmentToMedicalRecord = async (req, res) => {
  try {
    const { medicalRecordId } = req.params;
    const { attachment } = req.body;

    // Check if medical record exists
    const medicalRecord = await MedicalRecord.findById(medicalRecordId);
    if (!medicalRecord) {
      return res.status(404).json({ message: "Medical record not found" });
    }

    // check if attachment is provided
    if (!attachment) {
      return res.status(400).json({ message: "Attachment is required" });
    }

    // add attachment to the medical record
    const updatedMedicalRecord = await MedicalRecord.findByIdAndUpdate(
      medicalRecordId,
      { $push: { attachments: attachment } },
      { new: true }
    );

    res.status(200).json(updatedMedicalRecord);
  } catch (error) {
    console.error("Error adding attachment to medical record:", error);
    res
      .status(500)
      .json({ message: "Failed to add attachment to medical record" });
  }
};

// Function to delete a medical record
const deleteMedicalRecord = async (req, res) => {
  try {
    const { medicalRecordId } = req.params;
    const deletedRecord = await MedicalRecord.findByIdAndDelete(
      medicalRecordId
    );

    if (!deletedRecord) {
      return res.status(404).json({ message: "Medical record not found" });
    }

    res.status(200).json({ message: "Medical record deleted successfully" });
  } catch (error) {
    console.error("Error deleting medical record:", error);
    res.status(500).json({ message: "Failed to delete medical record" });
  }
};

// Function to update a medical record
const updateMedicalRecord = async (req, res) => {
  try {
    const { medicalRecordId } = req.params;
    const { patient, title, description, fees } = req.body;

    const updatedRecord = await MedicalRecord.findByIdAndUpdate(
      medicalRecordId,
      { patient, title, description, fees },
      { new: true }
    );

    if (!updatedRecord) {
      return res.status(404).json({ message: "Medical record not found" });
    }

    res.status(200).json(updatedRecord);
  } catch (error) {
    res.status(500).json({ message: "Failed to update medical record" });
  }
};

// Function to get a medical record by ID
const getMedicalRecordById = async (req, res) => {
  try {
    const { medicalRecordId } = req.params;

    // Find the medical record by its ID
    const medicalRecord = await MedicalRecord.findById(medicalRecordId);

    if (!medicalRecord) {
      return res.status(404).json({ message: "Medical record not found." });
    }

    // Find prescriptions associated with this medical record
    const prescriptions = await Prescription.find({
      medicalRecord: medicalRecordId,
    });

    console.log("Medical record retrieved successfully:", medicalRecord);

    // Include prescriptions in the response
    const medicalRecordWithPrescriptions = {
      ...medicalRecord.toObject(),
      prescriptions: prescriptions,
    };

    res.status(200).json(medicalRecordWithPrescriptions);
  } catch (error) {
    console.error("Error retrieving medical record:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getMedicalRecordByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;

    const medicalRecords = await MedicalRecord.find({
      patient: patientId,
    })
      .populate("prescriptions patient doctor")
      .sort({ createdAt: -1 }); // (newest to oldest)

    if (!medicalRecords || medicalRecords.length === 0) {
      return res
        .status(404)
        .json({ message: "Medical records not found for the patient." });
    }

    res.status(200).json(medicalRecords);
  } catch (error) {
    console.error("Error retrieving medical records:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createMedicalRecord,
  uploadAttachment,
  uploadPrescription,
  getMedicalRecordByPatientId,
  deleteMedicalRecord,
  updateMedicalRecord,
  getMedicalRecordById,
  addFeesToMedicalRecord,
  addPrescriptionsToMedicalRecord,
  uploadAttachmentToMedicalRecord,
};
