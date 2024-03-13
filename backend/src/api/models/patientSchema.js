const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
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
      required: true,
    },
    secondphone: {
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
      "firstName",
      "lastName",
      "dob",
      "gender",
      "phone",
      "allergies",
      "city",
      "doctor",
      "medicalRecords",
      "invoices",
      "appointments",
      "prescriptions",
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
      const patient = await this.create(patientData);
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
