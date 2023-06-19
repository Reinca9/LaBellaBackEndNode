const pizzaModel = require("../models/pizza.model");

module.exports.allPizzas = (req, res) => {
  pizzaModel.find((err, docs) => {
    if (!err) return res.status(200);
  });
};
