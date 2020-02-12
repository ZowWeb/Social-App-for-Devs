const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: "assets/images/default-user.png"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// defining collection name and instance with which we will use it in other files
module.exports = User = mongoose.model("users", UserSchema);
