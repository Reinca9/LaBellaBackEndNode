const express = require("express");
const router = express.Router();
const loginController = require("../controllers/connexion.controller");

router.post("/connexion", loginController.loginUser);

module.exports = router;
