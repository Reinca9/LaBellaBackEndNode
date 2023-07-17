const express = require("express");
const bodyParser = require("body-parser");
const registrationController = require("./controllers/inscription.controller");
const connexionController = require("./controllers/connexion.controller");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/register", registrationController.registerUser);
app.post("/connexion", connexionController.loginUser);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
