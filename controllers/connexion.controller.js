const userModel = require("../models/user.model");
const connexionModel = require("../models/connexion.model");
const connection = require("../config/database");

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
    const emailExists = await userModel.checkIfEmailExists(email);
    console.log("emailExists", emailExists); //  WORKS

    if (!emailExists) {
      console.log("email doesn't exist"); // WORKS
      return res.status(401).json({ error: "Invalid credentials" });
    } else {
      console.log("else entered"); // WORKS

      const authenticationResult = await connexionModel.authenticateUser(
        email,
        password
      );
      console.log("authenticationResult", authenticationResult);

      if (!authenticationResult.authenticated) {
        console.log("Authentication failed");
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = authenticationResult.token;
      res.cookie("token", token); // WORKS
      const dispatch = useDispatch();
      dispatch({ type: ActionType.LOGIN_SUCCESS });
      return res.status(200).json({ success: "User logged in successfully!" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ error: "An error occurred during login" });
  }
};

module.exports = {
  loginUser,
};
