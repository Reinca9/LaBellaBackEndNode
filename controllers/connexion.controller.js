const userModel = require("../models/user.model");
const connexionModel = require("../models/connexion.model");

const loginUser = async (req, res) => {
  try {
    const testQuery = "SELECT * FROM user WHERE user_mail = ?";
    const testValues = ["reinca9@hotmail.com"];
    connection.query(testQuery, testValues, (err, results) => {
      if (err) {
        console.error("Error executing test query:", err);
        return res
          .status(500)
          .json({ error: "An error occurred during login" });
      } else {
        console.log("Test query results:", results);
      }
    });

    const { email, password } = req.body;
    console.log(req.body);
    console.log("try loginUser");
    // Check if the email exists using checkIfEmailExists
    const emailExists = await userModel.checkIfEmailExists(email);
    console.log("emailExists", emailExists);

    if (!emailExists) {
      console.log("email doesn't exist");
      return res.status(401).json({ error: "Invalid credentials" });
    } else {
      console.log("else entered");
      // If email exists, call authenticateUser to verify the user's credentials
      const authenticationResult = await connexionModel.authenticateUser(
        email,
        password
      );
      console.log("authenticationResult", authenticationResult); // Add this log statement

      if (!authenticationResult.authenticated) {
        console.log("Authentication failed");
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = authenticationResult.token;
      console.log("auth token", token);

      res.cookie("token", token);

      res.redirect("/home");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ error: "An error occurred during login" });
  }
};

module.exports = {
  loginUser,
};
