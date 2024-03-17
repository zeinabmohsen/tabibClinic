const Patient = require("../models/patientSchema");
const mongoose = require("mongoose");

const createPatient = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      dob,
      phone,
      city,
      gender,
      secondPhone,
      middleName,
      doctors,
      referringPhysicians,
      motherName,
      insurance,
      weight,
      drugHistory,
      surgicalHistory,
      pastMedicalHistory,
    } = req.body;
    const newPatient = await Patient.createPatient({
      firstName,
      lastName,
      dob,
      doctors,
      phone,
      referringPhysicians,
      city,
      gender,
      secondPhone,
      middleName,
      motherName,
      insurance,
      weight,
      drugHistory,
      surgicalHistory,
      pastMedicalHistory,
    });


    await newPatient.save();

    return res.status(201).json({
      ...newPatient.transform(),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error creating patient" });
  }
};

const getPatientById = async (req, res) => {
  try {
    const patientId = req.params.id;

    const patient = await Patient.findById(patientId)
      .populate("doctors")
      .populate("referringPhysicians")
      .exec();
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    return res.status(200).json({
      ...patient.transform(),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error retrieving patient" });
  }
};

const getAllPatients = async (req, res) => {
  try {
    const { search } = req.query;
    if (!search || search === '""') {
      const patients = await Patient.find()
        .populate("doctors")
        .populate("referringPhysicians")
        .exec();
      const data = patients.map((patient) => patient.transform());
      return res.status(200).json(data);
    }

    // Find patients by query
    const patients = await Patient.find({
      $or: [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } },
        {
          _id: mongoose.Types.ObjectId.isValid(search)
            ? new mongoose.Types.ObjectId(search)
            : null,
        },
      ],
    });

    const data = patients.map((patient) => patient.transform());

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error retrieving patients" });
  }
};

const deletePatientById = async (req, res) => {
  try {
    const patientId = req.params.id;

    const deletedPatient = await Patient.findOneAndDelete({ _id: patientId });
    if (!deletedPatient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    return res.status(200).json({
      message: "Patient deleted successfully!",
      data: deletedPatient,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error deleting patient" });
  }
};

const updatePatientById = async (req, res) => {
  try {
    const patientId = req.params.id;
    const updateData = req.body;

    const patient = await Patient.findById(patientId)
      .populate(["doctors", "referringPhysicians"])
      .exec();
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    Object.assign(patient, updateData);
    await patient.save();

    return res.status(200).json({
      ...patient.transform(),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error updating patient" });
  }
};

const getPatientsByDoctorId = async (req, res) => {
  try {
    const { doctorId } = req.params;

    if (!doctorId || !mongoose.Types.ObjectId.isValid(doctorId)) {
      return res.status(400).json({ error: "Invalid doctor ID" });
    }

    const patients = await Patient.find({
      $or: [
        { doctors: doctorId },
        { referringPhysicians: doctorId }
      ]
    })
      .populate("doctors")
      .populate("referringPhysicians")
      .exec();

    const data = patients.map((patient) => patient.transform());

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error retrieving patients" });
  }
};


module.exports = {
  createPatient,
  deletePatientById,
  getPatientById,
  getAllPatients,
  updatePatientById,
  getPatientsByDoctorId
};
