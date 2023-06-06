const mongoose = require("mongoose");

const PizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: 255,
  },
  description: {
    type: String,
    required: true,
    maxlength: 255,
  },
  price: {
    type: Number,
    required: true,
    maxlength: 255,
  },
  base: {
    type: String,
    required: true,
    maxlength: 255,
  },
  imageUrl: {
    type: String,
    maxlength: 255,
  },
});

module.exports = mongoose.model("laBella");
