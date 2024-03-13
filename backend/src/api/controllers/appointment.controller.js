const Appointment = require("../models/appointment.model");
const httpStatus = require("http-status");
const User = require("../models/user.model");
const Patient = require("../models/patientSchema");
const Invoice = require("../models/invoice.model");

/**
 * Get appointment by id
 * @param {ObjectId} req.params.id
 * @returns {Promise<Appointment>}
 */
const getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.get(id);

    if (!appointment) {
      throw new Error({
        message: "Appointment does not exist",
        status: httpStatus.NOT_FOUND,
      });
    }
    const transformedAppointment = appointment.transform();

    res.status(httpStatus.OK).json(transformedAppointment);
  } catch (error) {
    res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

/**
 * Get all appointments
 * @returns {Promise<Appointment[]>}
 */
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.list();

    if (!appointments.length) {
      res.status(httpStatus.OK).json([]);
    } else {
      // Transform appointment data before sending response
      const transformedAppointments = appointments.map((appointment) =>
        appointment.transform()
      );
      res.status(httpStatus.OK).json(transformedAppointments);
    }
  } catch (error) {
    res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

/**
 * Create new appointment
 * @param {ObjectId} req.body.doctor
 * @param {ObjectId} req.body.patient
 * @param {Date} req.body.start
 * @param {Date} req.body.start
 * @param {String} req.body.reason
 * @returns {Promise<Appointment>}
 */
const createAppointment = async (req, res) => {
  try {
    const {
      doctor,
      patient,
      start,
      end,
      reason,
      newPatient,
      firstName,
      lastName,
      email,
      phone,
      dob,
      city,
      gender,
    } = req.body;

    let existingPatient;

    const existingDoctor = await User.get(doctor);
    if (!existingDoctor || existingDoctor.role !== "doctor") {
      throw new Error({
        message: "Doctor does not exist",
        status: httpStatus.NOT_FOUND,
      });
    }

    if (newPatient === false) {
      existingPatient = await Patient.get(patient);
      if (!existingPatient) {
        throw new Error({
          message: "Patient does not exist",
          status: httpStatus.NOT_FOUND,
        });
      }
    } else if (newPatient === true) {
      const newPatientData = {
        firstName,
        lastName,
        email,
        phone,
        dob,
        city,
        gender,
      };
      const newPatientInstance = await new Patient(newPatientData);
      existingPatient = await newPatientInstance.save();
    }

    const newAppointment = new Appointment({
      doctor,
      patient: newPatient ? existingPatient._id : existingPatient,
      start,
      end,
      reason,
    });

    const appointment = await newAppointment.save();

    // Transform appointment data before sending response
    const transformedAppointment = appointment.transform();

    res.status(httpStatus.CREATED).json({ ...transformedAppointment });
  } catch (error) {
    res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

/**
 * Get appointment by doctor id
 *
 */
const getAppointmentsByDoctorId = async (req, res) => {
  try {
    const { id } = req.params;

    const appointments = await Appointment.getByDoctorId(id);

    if (!appointments || appointments.length === 0) {
      throw new Error({
        message: "Appointments not found for the doctor",
        status: httpStatus.NOT_FOUND,
      });
    }

    // Transform appointment data before sending response
    const transformedAppointments = appointments.map((appointment) =>
      appointment.transform()
    );

    res.status(httpStatus.OK).json(transformedAppointments);
  } catch (error) {
    res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

/**
 * Get appointment by patient id
 *
 */

const getAppointmentByPatientId = async (req, res) => {
  try {
    const { id } = req.params;

    const appointments = await Appointment.getByPatientId(id);

    if (!appointments || appointments.length === 0) {
      throw new Error({
        message: "Appointments not found for the patient",
        status: httpStatus.NOT_FOUND,
      });
    }

    // Transform each appointment data before sending response
    const transformedAppointments = appointments.map((appointment) =>
      appointment.transform()
    );

    res.status(httpStatus.OK).json(transformedAppointments);
  } catch (error) {
    res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

/**
 * Update appointment status
 *
 */
const updateAppointmentStatus = async (req, res) => {
  try {
    const { id, status } = req.params;

    const appointment = await Appointment.updateStatus(id, status);

    if (!appointment) {
      throw new Error({
        message: "Appointment does not exist",
        status: httpStatus.NOT_FOUND,
      });
    }

    // Transform appointment data before sending response
    const transformedAppointment = appointment.transform();

    res.status(httpStatus.OK).json(transformedAppointment);
  } catch (error) {
    res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

/**
 * Update appointment
 *
 */

const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      doctor,
      patient,
      start,
      end,
      reason,
      newPatient,
      firstName,
      lastName,
      email,
      phone,
      dob,
      city,
      gender,
      reschedulingPurpose,
      newStart,
      newEnd,
    } = req.body;
    let existingPatient;

    const appointment = await Appointment.get(id);

    if (!appointment) {
      throw new Error({
        message: "Appointment does not exist",
        status: httpStatus.NOT_FOUND,
      });
    }

    const existingDoctor = await User.get(doctor);
    if (!existingDoctor || existingDoctor.role !== "doctor") {
      throw new Error({
        message: "Doctor does not exist",
        status: httpStatus.NOT_FOUND,
      });
    }

    if (newPatient === false) {
      existingPatient = await Patient.get(patient);
      if (!existingPatient) {
        throw new Error({
          message: "Patient does not exist",
          status: httpStatus.NOT_FOUND,
        });
      }
    } else if (newPatient === true) {
      const newPatientData = {
        firstName,
        lastName,
        email,
        phone,
        dob,
        city,
        gender,
      };
      const newPatientInstance = new Patient(newPatientData);
      existingPatient = await newPatientInstance.save();
    }

    const updatedAppointment = await Appointment.update(id, {
      doctor,
      patient: newPatient ? existingPatient._id : patient,
      oldStart: appointment.start,
      oldEnd: appointment.end,
      reason,
      reschedulingPurpose,
      start: appointment.status === "rescheduled" ? newStart : start,
      end: appointment.status === "rescheduled" ? newEnd : end,
    });

    // Transform appointment data before sending response
    const transformedAppointment = updatedAppointment.transform();

    res.status(httpStatus.OK).json(transformedAppointment);
  } catch (error) {
    res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

/**
 * Delete appointment
 *
 */
const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.delete(id);

    if (!appointment) {
      throw new Error({
        message: "Appointment does not exist",
        status: httpStatus.NOT_FOUND,
      });
    }

    res.status(httpStatus.OK).json({
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};
/**
 * Get appointments by logged in doctor
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
const getAppointmentsByLoggedInDoctor = async (req, res) => {
  try {
    // Assuming the doctor's ID is stored in req.user.id after authentication
    const doctorId = req.user.id;

    const appointments = await Appointment.getByDoctorId(doctorId);

    if (!appointments || appointments.length === 0) {
      throw new Error({
        message: "Appointments not found for the logged-in doctor",
        status: httpStatus.NOT_FOUND,
      });
    }

    // Transform appointment data before sending response
    const transformedAppointments = appointments.map((appointment) =>
      appointment.transform()
    );

    res.status(httpStatus.OK).json(transformedAppointments);
  } catch (error) {
    res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAppointmentById,
  getAllAppointments,
  createAppointment,
  getAppointmentsByDoctorId,
  getAppointmentByPatientId,
  updateAppointmentStatus,
  updateAppointment,
  deleteAppointment,
  getAppointmentsByLoggedInDoctor,
};
