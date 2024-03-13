const express = require("express");
const {
  createService,
  getServicesByDoctorId,
  deleteService,
  updateService,
} = require("../../controllers/servicesController");
const router = express.Router();

router.post("/", createService);
router.get("/:doctorId", getServicesByDoctorId);
router.put("/:serviceId", updateService);
router.delete("/:serviceId", deleteService);

module.exports = router;
