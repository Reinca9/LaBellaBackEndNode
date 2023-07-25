const userModel = require("../models/user.model");
const connexionModel = require("../models/connexion.model");

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    console.log("try loginUser");
    // Check if the email exists using checkIfEmailExists
    const emailExists = await userModel.checkIfEmailExists(email);
    console.log("emailExists", emailExists); // Ajoutons ce log

    if (!emailExists) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // If email exists, call authenticateUser to verify the user's credentials
    const authenticationResult = await connexionModel.authenticateUser(
      email,
      password
    );
    console.log("authenticationResult", authenticationResult); // Ajoutons ce log

    if (!authenticationResult.authenticated) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = authenticationResult.token;
    console.log("auth token", token);

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
