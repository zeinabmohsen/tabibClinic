const User = require("../models/user.model");
const Service = require("../models/service.model");

// Create a new service for the logged-in doctor
const createService = async (req, res) => {
  try {
    const { name, price } = req.body;

    // Check if name and price are provided
    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required" });
    }

    // Ensure price is a valid number
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice)) {
      return res.status(400).json({ message: "Price must be a valid number" });
    }

    const doctorId = req.user._id;

    // Find the doctor in the database
    const doctor = await User.findById(doctorId);
    if (!doctor || doctor.role !== "doctor") {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Ensure doctor.services is initialized as an array
    if (!doctor.services) {
      doctor.services = [];
    }

    // Create a new service object
    const service = await Service.createService(
      name,
      parsedPrice, // Pass the parsedPrice variable
      doctor
    );

    // Add the service to the doctor's services array
    doctor.services.push(service._id);

    // Save the updated doctor object
    await doctor.save();

    res.status(201).json({ data: service.transform() });
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({ message: "Server Error" });
  }
};




// Update an existing service for the logged-in doctor
const updateService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const { name, price } = req.body;

    const doctorId = req.user._id;
    
    // Find the doctor in the database
    const doctor = await User.findById(doctorId);
    if (!doctor || doctor.role !== "doctor") {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Find the service to update
    const service = await Service.get(serviceId);
    
    // Check if the service exists
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    
    // Check if the logged-in doctor is authorized to update the service
    if (service.doctor.toString() !== doctorId.toString()) {
      return res.status(403).json({ message: "You are not authorized to update this service" });
    }

    // Update the service
    const updatedService = await Service.updateService(
      serviceId,
      name,
      price,
      doctorId
    );

    // Send the updated service as response
    res.status(200).json({ data: updatedService.transform() });
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


// Delete a service for the logged-in doctor
const deleteService = async (req, res) => {
  try {
    const { serviceId } = req.params;

    // Get the logged-in user's ID
    const doctorId = req.user._id;

    // Find the doctor in the database
    const doctor = await User.findById(doctorId);
    if (!doctor || doctor.role !== "doctor") {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Find the service to delete
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    await Service.deleteService(serviceId, doctorId);

    // Remove the service from the doctor's services array
    doctor.services.pull(serviceId);

    // Save the updated doctor object
    await doctor.save();

    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get services by doctor ID
const getServicesByDoctorId = async (req, res) => {
  try {
    const { doctorId } = req.params;

    // Find the doctor in the database
    const doctor = await User.findById(doctorId).populate("services");
    if (!doctor || doctor.role !== "doctor") {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res
      .status(200)
      .json({ data: doctor.services.map((service) => service.transform()) });
  } catch (error) {
    console.error("Error getting services:", error);
    res.status(500).json({ message: "Server Error" });
  }
};



module.exports = {
  createService,
  updateService,
  deleteService,
  getServicesByDoctorId,
};
