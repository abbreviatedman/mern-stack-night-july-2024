const router = require("express").Router();

const {
  getAllmodels,
  getOnemodel,
  createOnemodel,
  deleteOnemodel,
  updateOnemodel,
} = require("../controllers/modelController");

// localhost:3001/model/allmodels
router.get("/allmodels", getAllmodels);

// localhost:3001/model/onemodel/:params
router.get("/onemodel/:params", getOnemodel);

// localhost:3001/model/createOnemodel
router.post("/createOnemodel", createOnemodel);

// localhost:3001/model/deleteOnemodel/:params
router.delete("/deleteOnemodel/:params", deleteOnemodel);

// localhost:3001/model/updateOnemodel/:params
router.put("/updateOnemodel/:params", updateOnemodel);

module.exports = router;
