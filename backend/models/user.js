const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobilenumber: { type: String, required: true },
  createdAt: {
    type: Date,
    default: new Date().toLocaleString(),
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
