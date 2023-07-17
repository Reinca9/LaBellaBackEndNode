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
    const query = "SELECT * FROM user WHERE user_mail = ?";
    const values = [email];
    connection.query(query, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        if (results.length === 0) {
          reject(new Error("User not found"));
        } else {
          const user = results[0];
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
