const express = require("express");
const router = express.Router();
const {
  login,
  forgotPassword,
} = require("../../controllers/authControllers");
const { loginValidator } = require("../../utils/validators/authValidation");

// Route for user login
router.post("/login", loginValidator, login);
router.post("/forgetpassword", forgotPassword);

module.exports = router;
