// routes/auth.js
const express = require("express");
const authController = require("../controllers/auth");
const { authenticate } = require("../middlewares/auth");

const router = express.Router();

// Public endpoints
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh", authController.refreshToken);

// Protected endpoint
router.post("/logout", authenticate, authController.logout);
router.get("/me", authenticate, authController.me);

module.exports = router;
