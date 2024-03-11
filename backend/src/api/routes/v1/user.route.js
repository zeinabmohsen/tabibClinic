const express = require("express");
const router = express.Router();

const { loggedIn } = require("../../controllers/user.controller");

router.get("/", loggedIn);

module.exports = router;
