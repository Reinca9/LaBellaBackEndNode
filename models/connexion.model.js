const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const userModel = require("../models/user.model");

const authenticateUser = async (email, password) => {
  try {
    const emailExists = await userModel.checkIfEmailExists(email);

    if (!emailExists) {
      throw new Error("Wrong email");
    }

    const user = await userModel.getUserByEmail(email);
    console.log("authUser function working"); // Add console log statement here

    const passwordMatch = await bcrypt.compare(password, user.user_password);

    if (!passwordMatch) {
      throw new Error("Wrong password");
    }

    const token = jwt.sign({ userId: user.user_id }, config.jwtSecret, {
      expiresIn: "24h",
    });

    return { authenticated: true, token };
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

module.exports = {
  authenticateUser,
};
