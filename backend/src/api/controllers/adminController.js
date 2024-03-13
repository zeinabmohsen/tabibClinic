const httpStatus = require("http-status");
const User = require("../models/user.model");

/**
 * Controller to fetch all users (admins only)
 */
const getAllUsers = async (req, res) => {
  try {
    // Check if the requesting user is an admin
    if (req.user.role !== "admin") {
      return res.status(httpStatus.UNAUTHORIZED).json({ error: "Unauthorized access" });
    }

    // Fetch all users
    const users = await User.find({ role: { $ne: "admin" } }).exec();

    return res.status(httpStatus.OK).json(users.map(user => user.transform()));
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
  }
};

/**
 * Controller to create a new user (admin only)
 */
const createUser = async (req, res) => {
  try {
    // Check if the requesting user is an admin
    if (req.user.role !== "admin") {
      return res.status(httpStatus.UNAUTHORIZED).json({ error: "Unauthorized access" });
    }

    // Extract user data from request body
    const userData = req.body;
    const color = "#" + Math.floor(Math.random() * 16777215).toString(16);

    // Create the new user
    const newUser = new User({...userData, color});
    await newUser.save();

    return res.status(httpStatus.CREATED).json({ message: "User created successfully", data: newUser.transform() });
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
  }
};

/**
 * Controller to delete a user by ID (admin only)
 */
const deleteUser = async (req, res) => {
  try {
    // Check if the requesting user is an admin
    if (req.user.role !== "admin") {
      return res.status(httpStatus.UNAUTHORIZED).json({ error: "Unauthorized access" });
    }

    // Extract user ID from request parameters
    const { userId } = req.params;

    // Find the user and delete
    await User.findByIdAndDelete(userId).exec();

    return res.status(httpStatus.OK).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
  }
};

/**
 * Controller to update a user by ID (admin only)
 */
const updateUser = async (req, res) => {
  try {
    // Check if the requesting user is an admin
    if (req.user.role !== "admin") {
      return res.status(httpStatus.UNAUTHORIZED).json({ error: "Unauthorized access" });
    }

    // Extract user ID and update data from request body
    const { userId } = req.params;
    const updateData = req.body;

    // Find the user and update
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true }).exec();

    if (!updatedUser) {
      return res.status(httpStatus.NOT_FOUND).json({ error: "User not found" });
    }

    return res.status(httpStatus.OK).json({ message: "User updated successfully", data: updatedUser.transform() });
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
  }
};

/**
 * Controller to get a user by ID (admin only)
 */
const getUserById = async (req, res) => {
  try {
    // Check if the requesting user is an admin
    if (req.user.role !== "admin") {
      return res.status(httpStatus.UNAUTHORIZED).json({ error: "Unauthorized access" });
    }

    // Extract user ID from request parameters
    const { userId } = req.params;

    // Find the user by ID
    const user = await User.findById(userId).exec();

    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({ error: "User not found" });
    }

    return res.status(httpStatus.OK).json({ data: user.transform() });
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
  getUserById
};
