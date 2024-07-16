const pokemon = require("../models/pokemonModel");

async function getAllpokemons(req, res) {
  try {
    let results = await pokemon.find({});

    res.json({
      message: "success",
      payload: results,
    });
  } catch (error) {
    let errorObj = {
      message: "get all pokemon failure",
      payload: error,
    };

    console.log(errorObj);

    res.json(errorObj);
  }
}

async function getOnepokemon(req, res) {
  try {
    let result = await pokemon.findOne({ name: req.params.name });

    res.json({
      message: "success",
      payload: result,
    });
  } catch (error) {
    let errorObj = {
      message: "get ONE pokemon failure",
      payload: error,
    };

    console.log(errorObj);

    res.json(errorObj);
  }
}

async function createOnepokemon(req, res) {
  try {
    // Accepting the front-end form data from the client to generate the document
    let newpokemon = req.body;

    // post the new document to the pokemon collection
    await pokemon.create(newpokemon);

    res.json({
      message: "success",
      payload: newpokemon,
    });
  } catch (error) {
    let errorObj = {
      message: "create one pokemon failure",
      payload: error,
    };

    console.log(errorObj);

    res.json(errorObj);
  }
}

async function deleteOnepokemon(req, res) {
  try {
    await pokemon.deleteOne({ name: req.params.name });

    res.json({
      message: "success",
      payload: req.params.name,
    });
  } catch (error) {
    let errorObj = {
      message: "delete one pokemon failure",
      payload: error,
    };

    console.log(errorObj);

    res.json(errorObj);
  }
}

async function updateOnepokemon(req, res) {
  try {
    let targetpokemon = await pokemon.findOne({ name: req.params.name });

    // ternaries avoid inputting undefined values
    let updatedpokemon = {
      name: req.body.name ? req.body.name : targetpokemon.name,
    };

    await pokemon.updateOne(
      { name: req.params.name },
      { $set: updatedpokemon },
      { upsert: true }
    );

    res.json({
      message: "success",
      payload: updatedpokemon,
    });
  } catch (error) {
    let errorObj = {
      message: "update one pokemon failure",
      payload: error,
    };

    console.log(errorObj);

    res.json(errorObj);
  }
}

module.exports = {
  getAllpokemons,
  getOnepokemon,
  createOnepokemon,
  deleteOnepokemon,
  updateOnepokemon,
};
