const router = require("express").Router();

const {
  getAllpokemons,
  getOnepokemon,
  createOnepokemon,
  deleteOnepokemon,
  updateOnepokemon,
} = require("../controllers/pokemonController");

// localhost:3001/pokemon/allpokemons
router.get("/allpokemons", getAllpokemons);

// localhost:3001/pokemon/onepokemon/:name
router.get("/onepokemon/:name", getOnepokemon);

// localhost:3001/pokemon/createOnepokemon
router.post("/createOnepokemon", createOnepokemon);

// localhost:3001/pokemon/deleteOnepokemon/:name
router.delete("/deleteOnepokemon/:name", deleteOnepokemon);

// localhost:3001/pokemon/updateOnepokemon/:name
router.put("/updateOnepokemon/:name", updateOnepokemon);

module.exports = router;
