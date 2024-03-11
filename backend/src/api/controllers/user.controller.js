const User = require("../models/user.model");
const httpStatus = require("http-status");

/**
 * Get logged in user info
 * @public
 */
exports.loggedIn = async (req, res) => {
  try {
    // Check if req.user is present (assuming req.user contains the user ID extracted from the token)
    if (!req.user) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "User not authenticated" });
    }

    // Get the user details and populate all fields except password
    const user = await User.get(req.user.id, { populate: "schedule" });

    // Transform user data before sending response
    const transformedUser = user.transform();

    // Send response
    res.status(httpStatus.OK).json(transformedUser);
  } catch (error) {
    // Handle errors
    console.error("Error in loggedIn:", error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "An unexpected error occurred" });
  }
};
