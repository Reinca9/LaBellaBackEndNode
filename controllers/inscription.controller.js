const bcrypt = require("bcrypt");
const connection = require("../db");

const saltRounds = 10;

const registerUser = (req, res) => {
  const { email, password, name, firstName, phoneNumber } = req.body;

  // Perform any necessary validation on the form data

  // Hash the password
  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      console.error("Error hashing password:", err);
      res.status(500).json({ error: "An error occurred during registration" });
      return;
    }

    // Create a new user object
    const newUser = {
      email,
      password: hashedPassword,
      name,
      firstName,
      phoneNumber,
    };

    // Insert the new user into the database
    const query =
      "INSERT INTO users (user_email, user_password, user_phone, user_prenom, user_nom) VALUES (?, ?, ?, ?, ?)";
    const values = [
      newUser.email,
      newUser.password,
      newUser.phoneNumber,
      newUser.firstName,
      newUser.name,
    ];

    connection.query(query, values, (err, result) => {
      if (err) {
        console.error("Error inserting user:", err);
        res
          .status(500)
          .json({ error: "An error occurred during registration" });
        return;
      }

      // If success
      res.json({ message: "Vous êtes bien inscrit" });
    });
  });
};

module.exports = {
  registerUser,
};
