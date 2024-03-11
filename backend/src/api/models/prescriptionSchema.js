const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },

    attachment: {
      type: String,
    },
    medicalRecord: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MedicalRecord",
    },
  },
  {
    timestamps: true,
  }
);

const Prescription = mongoose.model("Prescription", prescriptionSchema);

module.exports = Prescription;
