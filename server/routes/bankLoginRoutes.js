const express = require("express");
const router = express.Router();
const { signIn } = require("../controllers/bankLogin"); // Path to the controller

// POST route for bank sign-in
router.post("/signin", signIn);

module.exports = router;
