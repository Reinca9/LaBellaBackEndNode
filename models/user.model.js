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
    const query = "SELECT * FROM user WHERE user_mail = ?";
    const values = [email];
    connection.query(query, values, (err, results) => {
      if (err) {
        reject(err);
        console.log("await not functionning ");
      } else {
        console.log("await function");
        resolve(results.length > 0);
        return 1;
      }
    });
  });
};

module.exports = {
  createUser,
  checkIfEmailExists,
};
