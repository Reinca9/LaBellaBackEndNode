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
const checkIfEmailExists = (email) => {
  return new Promise((resolve, reject) => {
    console.log("Inside checkIfEmailExists", email);
    const query = "SELECT COUNT(*) as count FROM user WHERE user_mail = ?";
    const values = [email];
    connection.query(query, values, (err, results) => {
      if (err) {
        console.error("Error in SQL query:", err);
        reject(err);
      } else {
        const count = results[0].count;
        const exists = count > 0;
        resolve(exists);
      }
    });
  });
};

const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    console.log("getUserByEmail called with email:", email); // Add this log statement

    const query = "SELECT * FROM user WHERE user_mail = ?";
    const values = [email];
    connection.query(query, values, (err, results) => {
      if (err) {
        console.error("Error executing SQL query:", err); // Add this log statement
        reject(err);
      } else {
        console.log("SQL query results:", results); // Add this log statement

        if (results.length === 0) {
          console.log("User not found for email:", email); // Add this log statement
          reject(new Error("User not found"));
        } else {
          const user = results[0];
          console.log("User found:", user); // Add this log statement
          resolve(user);
        }
      }
    });
  });
};

module.exports = {
  createUser,
  checkIfEmailExists,
  getUserByEmail,
};
