const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

// Import your controllers
const registrationController = require('./controllers/inscription.controller');
const connexionController = require('./controllers/connexion.controller');

// Routes for user registration and login
app.post('/register', registrationController.registerUser);
app.post('/connexion', connexionController.loginUser);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});