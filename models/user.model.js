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

module.exports = {
  createUser,
};