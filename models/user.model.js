const connection = require("../config/database");

const createUser = (user, callback) => {
  const { email, password, firstName, lastName, phoneNumber } = user;
  const query =
    "INSERT INTO user (user_mail, user_password, user_prenom, user_nom, user_phone) VALUES (?, ?, ?, ?, ?)";
  const values = [email, password, firstName, lastName, phoneNumber];

  connection.query(query, values, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};

const getUserByEmail = (email, callback) => {
  const query = "SELECT * FROM user WHERE user_mail = ?";
  const values = [email];
  connection.query(query, values, (err, results) => {
    if (err) {
      callback(err);
    } else {
      if (results.length > 0) {
        const user = results[0];
        callback(null, user);
      } else {
        callback(null, null); // No user found with the given email
      }
    }
  });
};

module.exports = {
  createUser,
  getUserByEmail,
};
