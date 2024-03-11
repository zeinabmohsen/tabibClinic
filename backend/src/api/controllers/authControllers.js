const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const createToken = require("../utils/createtoken");
const sendEmail = require("../utils/sendEmail");

exports.login = async (req, res, next) => {
  try {
    // Check if email and password are provided
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Please provide both email and password.",
        });
    }

    // Check if user exists
    const user = await User.findOne({ email: req.body.email });

    // If user does not exist
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect email or password." });
    }
    // Check if the provided password matches the hashed password in the database
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect email or password." });
    }

    // Remove sensitive fields from the user object
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    // Generate token
    const token = createToken(user._id);

    // Send success response with user data and token
    res.status(200).json({ success: true, data: userWithoutPassword, token });
  } catch (error) {
    // Handle errors
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ success: false, message: "An unexpected error occurred." });
  }
};

exports.protect = async (req, res, next) => {
  try {
    // 1) Check if token exists
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      throw new Error(
        "You are not logged in. Please log in to access this route"
      );
    }

    // 2) Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // 3) Check if user exists
    const currentUser = await User.findById(decoded.userId);
    if (!currentUser) {
      throw new Error("The user that belongs to this token no longer exists");
    }

    // 4) Check if user changed password after token creation
    // if (currentUser.passwordChangedAt) {
    //   const passChangedTimestamp = parseInt(
    //     currentUser.passwordChangedAt.getTime() / 1000,
    //     10
    //   );
    //   // Password changed after token created (Error)
    //   if (passChangedTimestamp > decoded.iat) {
    //     throw new Error(
    //       "User recently changed his password. Please log in again."
    //     );
    //   }
    // }

    // Attach the user object to the request object
    req.user = currentUser;

    next();
  } catch (error) {
    res.status(401).json({ message: error.message || "Unauthorized" });
  }
};

exports.hasRoles =
  (...roles) =>
  async (req, res, next) => {
    try {
      // Ensure user roles are included in the provided roles
      if (!roles.includes(req.user.role)) {
        return next(
          new ApiError("You are not allowed to access this route", 403)
        );
      }
      next();
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Internal Server Error" });
    }
  };

exports.forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        message: `There is no user with that email ${req.body.email}`,
      });
    }

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedResetCode = crypto
      .createHash("sha256")
      .update(resetCode)
      .digest("hex");

    user.passwordResetCode = hashedResetCode;
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    user.passwordResetVerified = false;

    await user.save();

    const message = `Hi ${user.name},\n We received a request to reset the password on your E-shop Account. \n ${resetCode} \n Enter this code to complete the reset. \n Thanks for helping us keep your account secure.\n The E-shop Team`;

    await sendEmail({
      email: user.email,
      subject: "Your password reset code (valid for 10 min)",
      message,
    });

    res.status(200).json({
      status: "Success",
      message: "Reset code sent to email",
    });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    res
      .status(500)
      .json({ message: "There was an error processing your request" });
  }
};

exports.verifyPassResetCode = async (req, res, next) => {
  try {
    const hashedResetCode = crypto
      .createHash("sha256")
      .update(req.body.resetCode)
      .digest("hex");

    const user = await User.findOne({
      passwordResetCode: hashedResetCode,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Reset code invalid or expired" });
    }

    user.passwordResetVerified = true;
    await user.save();

    res.status(200).json({ status: "Success" });
  } catch (error) {
    console.error("Error in verifyPassResetCode:", error);
    res
      .status(500)
      .json({ message: "There was an error processing your request" });
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(404)
        .json({ message: `There is no user with email ${req.body.email}` });
    }

    if (!user.passwordResetVerified) {
      return res.status(400).json({ message: "Reset code not verified" });
    }

    user.password = req.body.newPassword;
    user.passwordResetCode = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetVerified = undefined;

    await user.save();

    const token = createToken(user._id);
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    res
      .status(500)
      .json({ message: "There was an error processing your request" });
  }
};

