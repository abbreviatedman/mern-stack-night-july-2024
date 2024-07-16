const mongoose = require("mongoose");

const mcuSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  debut: {
    type: String,
  },
  debutYear: {
    type: Number,
  },
});

const Mcu = mongoose.model("Mcu", mcuSchema);

module.exports = Mcu;
