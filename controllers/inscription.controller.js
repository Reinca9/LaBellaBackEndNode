const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");
const connection = require("../config/database"); // Add this line
const saltRounds = 10;

const registerUser = async (req, res) => {
  const { email, password, firstName, lastName, phoneNumber } = req.body;
  console.log(req.body);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/;
  const nameRegex = /^[A-Za-z]+$/;
  const phoneNumberRegex = /^(\+33\s?|0)[1-9](\s?\d{2}){4}$/;
  try {
    // const emailExists = userModel.checkIfEmailExists(email);

    if (emailExists > 0) {
      console.error("Email already exists");
      return res.status(400).json({ error: "Email already exists" });
    } else if (!email || !password || !firstName || !lastName || !phoneNumber) {
      return res.status(400).json({ error: "All fields are required" });
    } else if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    } else if (!passwordRegex.test(password)) {
      return res.status(400).json({ error: "Invalid password format" });
    } else if (!nameRegex.test(firstName)) {
      return res.status(400).json({ error: "Invalid first name format" });
    } else if (!nameRegex.test(lastName)) {
      return res.status(400).json({ error: "Invalid last name format" });
    } else if (!phoneNumberRegex.test(phoneNumber)) {
      return res.status(400).json({ error: "Invalid phone number format" });
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = {
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phoneNumber,
    };
    userModel.createUser(newUser);
    res.json({ message: "Registration successful" });
  } catch (error) {
    console.error("Error during registration:", error);
    return res
      .status(500)
      .json({ error: "An error occurred during registration" });
  }
};

module.exports = {
  registerUser,
};
