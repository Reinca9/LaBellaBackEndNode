const userModel = require("../models/user.model");
const connexionModel = require("../models/connexion.model");

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const authenticationResult = await connexionModel.authenticateUser(
      email,
      password
    );

    if (!authenticationResult.authenticated) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = authenticationResult.token;

    // Send the token in the response
    res.cookie("token", token);

    res.redirect("/home");
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ error: "An error occurred during login" });
  }
};

module.exports = {
  loginUser,
};
