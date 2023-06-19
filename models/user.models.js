const connection = require("../db");

const createUser = (user, callback) => {
  const { email, password, name, firstName, phoneNumber } = user;
  const query = `INSERT INTO users (user_email, user_password, user_phone, user_prenom, user_nom) VALUES (?, ?, ?, ?, ?)`;
  const values = [email, password, phoneNumber, firstName, name];

  connection.query(query, values, callback);
};

module.exports = {
  createUser,
};
