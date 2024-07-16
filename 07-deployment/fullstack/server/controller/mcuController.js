const Mcu = require("../models/mcuModel");

async function getAllCharacters(req, res) {
  try {
    let result = await Mcu.find({});

    res.json({
      message: "success",
      payload: result,
    });
  } catch (error) {
    res.json({
      message: "failure",
      payload: `getAllCharacters error: ${error}`,
    });
  }
}

async function createCharacter(req, res) {
  try {
    let newCharacter = {
      name: req.body.name,
      debut: req.body.debut,
      debutYear: req.body.debutYear,
    };

    await Mcu.create(newCharacter);

    res.json({
      message: "success",
      payload: newCharacter,
    });
  } catch (error) {
    res.json({
      message: "failure",
      payload: `createCharacter error: ${error}`,
    });
  }
}

async function getCharacterByName(req, res) {
  try {
    let foundCharacter = await Mcu.findOne({ name: req.params.name });

    res.json({
      message: "success",
      payload: foundCharacter,
    });
  } catch (error) {
    res.json({
      message: "failure",
      payload: `getCharacterByName error: ${error}`,
    });
  }
}

async function updateCharacter(req, res) {
  try {
    let targetCharacter = await Mcu.findOne({ _id: req.params.id });

    let updatedCharacter = {
      _id: targetCharacter._id,
      name: targetCharacter.name,
      debut: req.body.debut,
      debutYear: req.body.debutYear,
    };

    await Mcu.updateOne(
      { _id: req.params.id },
      { $set: updatedCharacter },
      { upsert: true }
    );

    res.json({
      message: "success",
      payload: updateCharacter,
    });
  } catch (e) {
    console.log(`Error in updateCharacter(): ` + e);
  }
}

async function deleteCharacter(req, res) {
  try {
    let targetCharacter = req.params.id;

    let deletedCharacter = await Mcu.deleteOne({ _id: targetCharacter });

    res.json({ message: "success", payload: deletedCharacter });
  } catch (e) {
    console.log(`Error in deleteCharacter(): ` + e);
  }
}

module.exports = {
  getAllCharacters,
  createCharacter,
  getCharacterByName,
  updateCharacter,
  deleteCharacter,
};
