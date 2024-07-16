const mongoose = require("mongoose");

// #2: Fill the schema with the necessary properties
const userSchema = new mongoose.Schema({
  // username
  // password
  // array of threadNos (numbers) that user has posted to
  // array of postNos (numbers) that user has submitted
});

const User = mongoose.model("User", userSchema);

module.exports = User;
