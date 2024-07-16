const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema({
  property: {
    type: String,
    unique: true,
    required: true,
  },
});

const model = mongoose.model("model", modelSchema);

module.exports = model;
