const express = require("express");
const router = express.Router();
const registrationController = require("../controllers/inscription.controller");

router.post("/register", registrationController.registerUser);

module.exports = router;
