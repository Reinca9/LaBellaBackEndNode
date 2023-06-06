const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    unique: true,
    maxlength: 255,
  },
  name: {
    type: String,
    required: true,
    maxlength: 255,
  },
  firstName: {
    type: String,
    required: true,
    maxlength: 255,
  },
  phoneNumber: {
    type: Number,
    maxlength: 255,
  },
});
module.exports = mongoose.model("laBella", UserSchema);
