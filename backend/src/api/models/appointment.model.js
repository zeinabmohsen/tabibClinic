const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
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
    invoice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
    },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    reason: String,
    status: {
      type: String,
      enum: ["scheduled", "cancelled", "completed", "absent", "rescheduled"],
      default: "scheduled",
    },
    allDay: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "Appointment",
    },
    reschedulingPurpose: {
      type: String,
    },
    oldStart: {
      type: Date,
    },
    oldEnd: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Methods
 */
appointmentSchema.method({
  transform() {
    const transformed = {};
    const fields = [
      "_id",
      "doctor",
      "patient",
      "invoice",
      "start",
      "end",
      "reason",
      "allDay",
      "title",
      "reschedulingPurpose",
      "oldStart",
      "oldEnd",
      "status",
      "createdAt",
      "updatedAt",
    ];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },
});

/**
 * Statics
 */
appointmentSchema.statics = {
  statuses: ["scheduled", "cancelled", "completed", "absent", "rescheduled"],

  /**
   * Get appointment
   *
   * @param {ObjectId} id - The objectId of appointment.
   * @returns {Promise<Appointment, APIError>}
   */
  async get(id) {
    try {
      let appointment;

      if (mongoose.Types.ObjectId.isValid(id)) {
        appointment = await this.findById(id).exec();
      }
      if (appointment) {
        return appointment;
      }

      throw new Error("No such appointment exists!");
    } catch (error) {
      throw error;
    }
  },

  /**
   * List appointments in descending order of 'createdAt' timestamp.
   *
   * @param {number} skip - Number of appointments to be skipped.
   * @param {number} limit - Limit number of appointments to be returned.
   * @returns {Promise<Appointment[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .populate("doctor")
      .populate("patient")
      .exec();
  },

  /**
   * Get appointments by doctorId
   */
  async getByDoctorId(doctorId) {
    try {
      let appointments;

      if (mongoose.Types.ObjectId.isValid(doctorId)) {
        appointments = await this.find({ doctor: doctorId })
          .populate("doctor")
          .populate("patient")
          .exec();
      }
      if (appointments) {
        return appointments;
      }

      throw new Error("No such appointment exists!");
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get appointments by patientId
   */
  async getByPatientId(patientId) {
    try {
      let appointments;

      if (mongoose.Types.ObjectId.isValid(patientId)) {
        appointments = await this.find({ patient: patientId })
          .populate("doctor")
          .exec();
      }
      if (appointments) {
        return appointments;
      }

      throw new Error("No such appointment exists!");
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update appointment status
   */
  async updateStatus(id, status) {
    try {
      let appointment;

      if (mongoose.Types.ObjectId.isValid(id)) {
        appointment = await this.findById(id).exec();
      }
      if (appointment) {
        appointment.status = status;
        return appointment.save();
      }

      throw new Error("No such appointment exists!");
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update appointment
   */
  async update(id, data) {
    try {
      let appointment;

      if (mongoose.Types.ObjectId.isValid(id)) {
        appointment = await this.findById(id).exec();
      }
      if (appointment) {
        appointment.set(data);
        return appointment.save();
      }

      throw new Error("No such appointment exists!");
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete appointment
   */
  async delete(id) {
    try {
      let appointment;

      if (mongoose.Types.ObjectId.isValid(id)) {
        appointment = await this.findById(id).exec();
      }
      if (appointment) {
        return this.deleteOne({ _id: id }).exec();
      }

      throw new Error("No such appointment exists!");
    } catch (error) {
      throw error;
    }
  },
};

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
