const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const { getBalance } = require("../controllers/balanceController");

router.get("/", authMiddleware, getBalance);

module.exports = router;