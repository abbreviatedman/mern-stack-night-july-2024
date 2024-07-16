const mongoose = require("mongoose");

const pokemonSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
});

const pokemon = mongoose.model("pokemon", pokemonSchema);

module.exports = pokemon;
