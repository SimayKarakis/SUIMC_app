const express = require("express");
const healthController = require("../controllers/health");
const authRoutes = require("./auth");

const router = express.Router();

// Health check
router.get("/health", healthController.getHealth);

// Auth
router.use("/auth", authRoutes);

module.exports = router;
