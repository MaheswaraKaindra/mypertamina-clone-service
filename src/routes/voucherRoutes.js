const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const { getVouchers } = require("../controllers/voucherController");

router.get("/", authMiddleware, getVouchers);

module.exports = router;