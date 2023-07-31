const connection = require("../config/database");

const createUser = (user) => {
  return new Promise((resolve, reject) => {
    const { email, password, firstName, lastName, phoneNumber } = user;
    const query =
      "INSERT INTO user (user_mail, user_password, user_prenom, user_nom, user_phone) VALUES (?, ?, ?, ?, ?)";
    const values = [email, password, firstName, lastName, phoneNumber];
    connection.query(query, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
const checkIfEmailExists = async (email) => {
  console.log("Inside checkIfEmailExists:", email); // WORKS

  const query = "SELECT COUNT(*) as count FROM user WHERE user_mail = ?";
  const values = [email];

  try {
    const [results] = await connection.execute(query, values);
    console.log("SQL query results:", results); // WORKS

    const count = results[0].count;
    const exists = count > 0;
    return exists;
  } catch (error) {
    console.error("Error executing SQL query:", error);
    throw error;
  }
};

const getUserByEmail = async (email) => {
  try {
    console.log("getUserByEmail called with email:", email); // WORKS

    const query = "SELECT * FROM user WHERE user_mail = ?";
    const values = [email];

    const [results] = await connection.execute(query, values);

    if (results.length === 0) {
      console.log("User not found for email:", email);
      throw new Error("User not found");
    } else {
      const user = results[0];
      console.log("User found:", user);
      return user;
    }
  } catch (error) {
    console.error("Error executing SQL query:", error);
    throw error;
  }
};

module.exports = {
  createUser,
  checkIfEmailExists,
  getUserByEmail,
};
