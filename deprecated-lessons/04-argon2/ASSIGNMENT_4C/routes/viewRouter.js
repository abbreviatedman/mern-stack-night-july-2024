const router = require("express").Router();

const {
  renderCatalogPage,
  renderSingleThreadPage,
  // renderRegisterPage,
  // renderLoginPage,
  logout,
} = require("../controllers/viewController");

const { isLoggedIn } = require("./authMiddleware");
// #21: use isLoggedIn as middleware for each route

router.get("/", renderCatalogPage);

// #13: Create a route at this URL extension
// localhost:8080/register

// #17: Create a route at this URL extension
// localhost:8080/login

// #26: Create a route at this URL extension
// localhost:8080/logout

router.get("/thread/:threadNo", renderSingleThreadPage);

module.exports = router;
