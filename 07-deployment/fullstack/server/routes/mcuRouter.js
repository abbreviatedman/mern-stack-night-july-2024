const express = require("express");
const router = express.Router();

const {
  getAllCharacters,
  createCharacter,
  getCharacterByName,
  updateCharacter,
  deleteCharacter,
} = require("../controller/mcuController");

// localhost:3001/api/allCharacters
router.get("/allCharacters", getAllCharacters);

// localhost:3001/api/createCharacter
router.post("/createCharacter", createCharacter);

// localhost:3001/api/getCharacterByName/:name
router.get("/getCharacterByName/:name", getCharacterByName);

// localhost:3001/api/updateCharacter/:id
router.put("/updateCharacter/:id", updateCharacter);

router.delete("/deleteCharacter/:id", deleteCharacter);

module.exports = router;
