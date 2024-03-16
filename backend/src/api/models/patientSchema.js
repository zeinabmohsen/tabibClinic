const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    fileNumber: {
      type: Number,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
    },
    motherName: {
      type: String,
    },
    dob: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    phone: {
      type: String,
    },
    secondPhone: {
      type: String,
    },
    allergies: {
      type: [String],
      default: [],
    },
    city: {
      type: String,
    },
    doctors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    referringPhysicians: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    medicalRecords: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MedicalRecord",
      },
    ],
    invoices: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Invoice",
      },
    ],
    appointments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
      },
    ],
    prescriptions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Prescription",
      },
    ],
    pastMedicalHistory: {
      type: String,
    },
    surgicalHistory: {
      type: String,
    },
    drugHistory: {
      type: String,
    },
    weight: {
      type: Number,
    },
    insurance: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// methods

patientSchema.method({
  transform() {
    const transformed = {};
    const fields = [
      "_id",
      "fileNumber",
      "firstName",
      "lastName",
      "dob",
      "gender",
      "phone",
      "secondPhone",
      "motherName",
      "middleName",
      "allergies",
      "city",
      "doctors",
      "referringPhysicians",
      "medicalRecords",
      "invoices",
      "appointments",
      "prescriptions",
      "insurance",
      "weight",
      "drugHistory",
      "surgicalHistory",
      "pastMedicalHistory",
      "createdAt",
    ];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },
});

// statics

patientSchema.statics = {
  /**
   * Create a patient
   */
  async createPatient(patientData) {
    try {
      const lastPatient = await this.findOne().sort({ fileNumber: -1 }).exec();
      let fileNumber = 1;
      if (lastPatient && lastPatient.fileNumber) {
        fileNumber = lastPatient.fileNumber + 1;
      } else {
        fileNumber = (await this.find().exec()).length + 1;
      }

      const patient = await this.create({ ...patientData, fileNumber });

      return patient;
    } catch (error) {
      throw error;
    }
  },
  async get(id) {
    try {
      let patient;
      if (mongoose.Types.ObjectId.isValid(id)) {
        patient = await this.findById(id).exec();
      }
      if (patient) {
        return patient;
      }
      throw new Error("Patient not found");
    } catch (error) {
      throw error;
    }
  },

  /**
   * List patients in descending order of 'createdAt' timestamp.
   *
   * @param {number} skip - Number of patients to be skipped.
   * @param {number} limit - Limit number of patients to be returned.
   * @returns {Promise<Patient[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find().sort({ createdAt: -1 }).skip(+skip).limit(+limit).exec();
  },

  /**
   * Get patients by doctorId
   */
  async getByDoctorId(doctorId) {
    try {
      let patients;
      if (mongoose.Types.ObjectId.isValid(doctorId)) {
        patients = await this.find({ doctor: doctorId }).exec();
      }
      if (patients) {
        return patients;
      }
      throw new Error("No such patient exists!");
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get patients by patientId
   */
  async getByPatientId(patientId) {
    try {
      let patients;
      if (mongoose.Types.ObjectId.isValid(patientId)) {
        patients = await this.find({ patient: patientId }).exec();
      }
      if (patients) {
        return patients;
      }
      throw new Error("No such patient exists!");
    } catch (error) {
      throw error;
    }
  },
};

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
