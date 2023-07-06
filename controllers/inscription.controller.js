const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");

const saltRounds = 10;

const registerUser = async (req, res) => {
  const { email, password, firstName, lastName, phoneNumber } = req.body;
  console.log("query sent");
  try {
    const existingUser = await userModel.getUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Perform any necessary validation on the form data
    if (!email || !password || !firstName || !lastName || !phoneNumber) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Validate password format
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ error: "Invalid password format" });
    }

    // Validate first name format
    const nameRegex = /^[A-Za-z]+$/;
    if (!nameRegex.test(firstName)) {
      return res.status(400).json({ error: "Invalid first name format" });
    }

    // Validate last name format
    if (!nameRegex.test(lastName)) {
      return res.status(400).json({ error: "Invalid last name format" });
    }

    // Validate phone number format
    const phoneNumberRegex = /^(\+33\s?|0)[1-9](\s?\d{2}){4}$/;
    if (!phoneNumberRegex.test(phoneNumber)) {
      return res.status(400).json({ error: "Invalid phone number format" });
    }

    // Hash the password
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
      if (err) {
        console.error("Error hashing password:", err);
        return res
          .status(500)
          .json({ error: "An error occurred during registration" });
      }

      // Create a new user object
      const newUser = {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phoneNumber,
      };

      // Insert the new user into the database
      userModel.createUser(newUser, (err, result) => {
        if (err) {
          console.error("Error inserting user:", err);
          return res
            .status(500)
            .json({ error: "An error occurred during registration" });
        }

        // If success
        res.json({ message: "Registration successful" });
      });
    });
  } catch (error) {
    console.error("Error checking user:", error);
    return res
      .status(500)
      .json({ error: "An error occurred during registration" });
  }
};

module.exports = {
  registerUser,
};
