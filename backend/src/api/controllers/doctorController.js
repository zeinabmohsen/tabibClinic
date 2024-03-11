const User = require("../models/user.model");
const httpStatus = require("http-status");


/**
 * Get doctor by id
 * @param {ObjectId} req.params.id
 * @returns {Promise<User>}
 */
const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    //populate the schedule field
    const user = await User.findById(id).populate('schedule').populate('services');
    
    if (!user || user.role !== "doctor") {
      throw new Error({
        message: "Doctor does not exist",
        status: httpStatus.NOT_FOUND,
      });
    }

    // Transform user data before sending response
    const transformedUser = user.transform();

    res.status(httpStatus.OK).json(transformedUser);
  } catch (error) {
    res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

/**
 * Get all doctors
 * @returns {Promise<User[]>}
 */
const getAllDoctors = async (req, res) => {
  try {
      const doctors = await User.find({ type: "doctor" }).populate('schedule');

      if (!doctors || doctors.length === 0) {
          return res.status(404).json({ message: 'No doctors found' });
      }
      res.status(200).json(doctors);
      console.log('Doctors retrieved successfully:', doctors);
  } catch (error) {
      console.error('Error retrieving doctors:', error);
      res.status(500).json({ message: 'Server Error' });
  }
};




/**
 * Delete doctor by id
 * @param {ObjectId} req.params.id - The id of the doctor
 * @returns {Promise<void>}
 */
const deleteDoctorById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedDoctor = await User.findByIdAndDelete(id);

    if (!deletedDoctor) {
      throw new Error({
        message: "Doctor does not exist",
        status: httpStatus.NOT_FOUND,
      });
    }

    res.status(httpStatus.NO_CONTENT).json();
  } catch (error) {
    res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

// Create doctor
const addDoctor = async (req, res, next) => {
  try {
    const doctorData = req.body;
    doctorData.role = "doctor";


    const doctor = await User.create(doctorData);
    await doctor.save();

    res.status(httpStatus.CREATED).json(doctor.transform());
  } catch (error) {
    next(error);
  }
};

/**
 * Update doctor by id
 * @param {ObjectId} req.params.id
 * @param {Object} req.body
 * @returns {Promise<User>}
 */
const updateDoctorById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Check if the doctor exists
    const doctor = await User.findById(id);
    if (!doctor || doctor.role !== "doctor") {
      const error = new Error("Doctor not found");
      error.status = httpStatus.NOT_FOUND;
      throw error;
    }

    // Update doctor's data
    Object.assign(doctor, updateData);
    await doctor.save();

    res.status(httpStatus.OK).json(doctor.transform());
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addDoctor,
  deleteDoctorById,
  getAllDoctors,
  getDoctorById,
  updateDoctorById,
};
