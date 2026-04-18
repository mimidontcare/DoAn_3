const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

// Định nghĩa nhánh POST /api/auth/login
router.post("/login", authController.login);

module.exports = router;
