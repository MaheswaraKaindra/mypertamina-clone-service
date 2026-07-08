const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const { getVehicles } = require("../controllers/vehicleController");

router.get("/", authMiddleware, getVehicles);

module.exports = router;