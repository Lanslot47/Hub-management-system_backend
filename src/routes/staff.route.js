const express = require("express");
const router = express.Router();

const staffController = require("../controllers/staff.controller");

router.post("/create-staff", staffController.createStaff);

router.get("/get-staff", staffController.getAllStaff);

module.exports = router;