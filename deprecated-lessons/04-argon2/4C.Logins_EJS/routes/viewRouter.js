const router = require("express").Router();

const {
  renderHomepage,
  renderLoginForm,
  logout,
} = require("../controllers/viewController");

const { requireAuth } = require("./authMiddleware");

// localhost:8888/
router.get("/", requireAuth, renderHomepage);

// localhost:8888/login
router.get("/login", renderLoginForm);

//
router.get("/logout", logout);

module.exports = router;
