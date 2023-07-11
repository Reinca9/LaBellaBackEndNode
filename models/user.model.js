const connection = require("../config/database");

const createUser = (user, callback) => {
  const { email, password, firstName, lastName, phoneNumber } = user;
  const query =
    "INSERT INTO user (user_mail, user_password, user_prenom, user_nom, user_phone) VALUES (?, ?, ?, ?, ?)";
  const values = [email, password, firstName, lastName, phoneNumber];
  console.log(query);
  connection.query(query, values, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};

const checkIfEmailExists = (email, value) => {
  const query = "SELECT * FROM user WHERE user_mail = ?";
  const values = email;
  console.log(query);
  console.log(email);
  connection.query(query, values, (results) => {
    if (results.length > 0) {
      const user = results[0];
      console.log("true");
      value = true;
      return;
    } else {
      console.log("false");
      value = false;
      return;
    }
  });
};

module.exports = {
  createUser,
  checkIfEmailExists,
};
