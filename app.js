const express = require("express");
const bodyParser = require("body-parser");
const registrationController = require("./controllers/inscription.controller");

const cors = require("cors");

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/register", registrationController.registerUser);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
