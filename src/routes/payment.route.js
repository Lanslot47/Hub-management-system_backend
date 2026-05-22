const express = require("express");

const router = express.Router();

const {
  getPaymentAnalytics,
} = require("../controllers/payment.controller");

router.get("/payment-analytics", getPaymentAnalytics);

module.exports = router;