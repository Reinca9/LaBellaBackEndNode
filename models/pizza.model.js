const connection = require("../db");

const createPizza = (pizza, callback) => {
  const { name, description, price, base, imageUrl } = pizza;
  const query = `INSERT INTO pizzas (name, description, price, base, imageUrl) VALUES (?, ?, ?, ?, ?)`;
  const values = [name, description, price, base, imageUrl];

  connection.query(query, values, callback);
};

module.exports = {
  createPizza,
};
