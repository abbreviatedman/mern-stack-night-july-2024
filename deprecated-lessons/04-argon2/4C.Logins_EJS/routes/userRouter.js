const router = require("express").Router();

const {
  createUser,
  verifyPassword,
  updatePassword,
} = require("../controllers/userController");

const { requireAuth } = require("./authMiddleware");

// localhost:8888/api/createUser
router.post("/createUser", createUser);

// localhost:8888/api/verifyPassword
router.post("/verifyPassword", verifyPassword);

// localhost:8888/api/updatePassword
router.put("/updatePassword", requireAuth, updatePassword);

module.exports = router;
