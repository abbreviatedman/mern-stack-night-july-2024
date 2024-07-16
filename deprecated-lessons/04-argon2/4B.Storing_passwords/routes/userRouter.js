const router = require("express").Router();

const {
  createUser,
  verifyPassword,
  updatePassword,
} = require("../controllers/userController");

// localhost:8888/api/createUser
router.post("/createUser", createUser);

// localhost:8888/api/verifyPassword
router.post("/verifyPassword", verifyPassword);

// localhost:8888/api/updatePassword
router.put("/updatePassword", updatePassword);

module.exports = router;
