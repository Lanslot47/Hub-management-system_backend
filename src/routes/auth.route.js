const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");

router.post("/create-admin", authController.signup);

router.post("/login", authController.login);

module.exports = router;