const collectionName = require("../models/collectionNameModel");

async function getAllcollectionNames(req, res) {
  try {
    let results = await collectionName.find({});

    res.json({
      message: "success",
      payload: results,
    });
  } catch (error) {
    let errorObj = {
      message: "get all collectionName failure",
      payload: error,
    };

    console.log(errorObj);

    res.json(errorObj);
  }
}

async function getOnecollectionName(req, res) {
  try {
    let result = await collectionName.findOne({
      propertyName: req.params.propertyName,
    });

    res.json({
      message: "success",
      payload: result,
    });
  } catch (error) {
    let errorObj = {
      message: "get ONE collectionName failure",
      payload: error,
    };

    console.log(errorObj);

    res.json(errorObj);
  }
}

async function createOnecollectionName(req, res) {
  try {
    // Accepting the front-end form data from the client to generate the document
    let newcollectionName = req.body;

    // post the new document to the collectionName collection
    await collectionName.create(newcollectionName);

    res.json({
      message: "success",
      payload: newcollectionName,
    });
  } catch (error) {
    let errorObj = {
      message: "create one collectionName failure",
      payload: error,
    };

    console.log(errorObj);

    res.json(errorObj);
  }
}

async function deleteOnecollectionName(req, res) {
  try {
    await collectionName.deleteOne({ propertyName: req.params.propertyName });

    res.json({
      message: "success",
      payload: req.params.propertyName,
    });
  } catch (error) {
    let errorObj = {
      message: "delete one collectionName failure",
      payload: error,
    };

    console.log(errorObj);

    res.json(errorObj);
  }
}

async function updateOnecollectionName(req, res) {
  try {
    let targetcollectionName = await collectionName.findOne({
      propertyName: req.params.propertyName,
    });

    // ternaries avoid inputting undefined values
    let updatedcollectionName = {
      propertyName: req.body.propertyName
        ? req.body.propertyName
        : targetcollectionName.propertyName,
    };

    await collectionName.updateOne(
      { propertyName: req.params.propertyName },
      { $set: updatedcollectionName },
      { upsert: true }
    );

    res.json({
      message: "success",
      payload: updatedcollectionName,
    });
  } catch (error) {
    let errorObj = {
      message: "update one collectionName failure",
      payload: error,
    };

    console.log(errorObj);

    res.json(errorObj);
  }
}

module.exports = {
  getAllcollectionNames,
  getOnecollectionName,
  createOnecollectionName,
  deleteOnecollectionName,
  updateOnecollectionName,
};
