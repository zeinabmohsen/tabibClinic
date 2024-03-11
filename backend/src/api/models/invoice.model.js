const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    doctorAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    clinicAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Unpaid", "Paid"],
      default: "Unpaid",
    },
  },
  {
    timestamps: true,
  }
);

invoiceSchema.pre("save", async function (next) {
  const invoice = this;
  if (invoice.isModified("amount")) {
    if (invoice.amount < 0) {
      throw new Error("Amount cannot be negative");
    }
  }
  next();
});

// statics
invoiceSchema.statics = {
  async get(id) {
    try {
      const invoice = await this.findById(id).exec();
      if (invoice) {
        return invoice;
      }
      throw new Error({
        message: "Invoice does not exist",
        status: 404,
      });
    } catch (error) {
      throw error;
    }
  },
};

module.exports = mongoose.model("Invoice", invoiceSchema);
