const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  pass: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  favorites: [],
});

module.exports = mongoose.model("User", userSchema);
