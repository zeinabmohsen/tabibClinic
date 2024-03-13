const mongoose = require("mongoose");

const doctorScheduleSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    weekdays: [
      {
        day: {
          type: String,
          required: true,
          enum: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
        },
        startTime: {
          type: String,
          match: /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, // Validate time format
          required: true,
        },
        endTime: {
          type: String,
          match: /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// statics

doctorScheduleSchema.statics = {
  async getDoctorSchedule(doctorId) {
    return this.findOne({ doctor: doctorId });
  },
  async updateDoctorSchedule(scheduleId, updatedFields) {
    return this.findByIdAndUpdate(scheduleId, updatedFields, { new: true });
  },

  async createDoctorSchedule(doctorId, weekdays) {
    return this.create({
      doctor: doctorId,
      weekdays,
    });
  },
};

module.exports = mongoose.model("DoctorSchedule", doctorScheduleSchema);
