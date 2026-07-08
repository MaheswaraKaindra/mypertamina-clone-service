const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const { getTransactions } = require("../controllers/transactionController");

router.get("/", authMiddleware, getTransactions);

module.exports = router;