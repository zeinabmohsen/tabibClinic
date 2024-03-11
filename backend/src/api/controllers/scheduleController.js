const DoctorSchedule = require("../models/scheduleSchema");
const User = require("../models/user.model");

// CREATE
async function createDoctorSchedule(req, res) {
  const { doctorId } = req.params;
  const { weekdays } = req.body;
  try {
    const doctor = await User.findById(doctorId);
    if (!doctor) {
      throw new Error("Doctor not found");
    }

    const doctorSchedule = await DoctorSchedule.getDoctorSchedule(doctorId);

    if (doctorSchedule) {
      const updatedSchedule = await DoctorSchedule.updateDoctorSchedule(
        doctorSchedule._id,
        {
          weekdays,
        }
      );
      await User.findByIdAndUpdate(doctorId, {
        schedule: updatedSchedule._id,
      });

      return res.status(200).json(updatedSchedule);
    } else {
      const newSchedule = await DoctorSchedule.createDoctorSchedule(
        doctorId,
        weekdays
      );
      return res.status(201).json(newSchedule);
    }
  } catch (error) {
    console.error("Error creating doctor schedule:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// GET
async function getDoctorSchedule(req, res) {
  const { doctorId } = req.params;
  try {
    const schedule = await DoctorSchedule.findOne({ doctor: doctorId });
    if (!schedule) {
      return res.status(404).json({ error: "Schedule not found" });
    }

    res.json(schedule);
  } catch (error) {
    console.error("Error fetching doctor schedules:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// UPDATE
async function updateDoctorSchedule(req, res) {
  const { scheduleId } = req.params;
  const { weekdays } = req.body;
  try {
    const updatedSchedule = await DoctorSchedule.updateDoctorSchedule(
      scheduleId,
      {
        weekdays,
      }
    );

    res.json(updatedSchedule);
  } catch (error) {
    console.error("Error updating doctor schedule:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// DELETE
async function deleteDoctorSchedule(req, res) {
  const { doctorId, scheduleId } = req.params;
  try {
    await DoctorSchedule.findOneAndDelete({
      _id: scheduleId,
      doctor: doctorId,
    });
    console.log("Doctor schedule deleted successfully.");
    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting doctor schedule:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  createDoctorSchedule,
  deleteDoctorSchedule,
  getDoctorSchedule,
  updateDoctorSchedule,
};
