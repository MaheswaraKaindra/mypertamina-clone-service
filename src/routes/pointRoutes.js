const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const { getPoints } = require("../controllers/pointController");

router.get("/", authMiddleware, getPoints);

module.exports = router;