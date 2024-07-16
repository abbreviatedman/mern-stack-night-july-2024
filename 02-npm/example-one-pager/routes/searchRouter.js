/*
    IMPORTS
*/
const express = require("express");
const router = express.Router();
const axios = require("axios");

/*
    REQUEST HANDLERS
*/
// localhost:3000/
router.get("/", (req, res) => {
  res.render("home", { data: [] });
});

// localhost:3000/search
router.get("/search", async (req, res) => {
  // capture the query
  let query = req.query.search;

  try {
    let payload = await axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${query}`
    );

    // console.log(payload.data.drinks)

    if (!payload.data) {
      res.render("home", { data: [] });
    } else {
      res.render("home", { data: payload.data.drinks });
    }
  } catch (error) {
    console.log(error);
  }
});

/*
    EXPORT
*/
module.exports = router;
