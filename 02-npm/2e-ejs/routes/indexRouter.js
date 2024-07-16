/*
    Import express and create a router variable
*/
const express = require("express");
const router = express.Router();

/*
    Teacher Data
*/

/*
    Set up a response to localhost:3000/
*/
router.get("/", (req, res) => {
  res.send("homepage");
});

/*
    Set up a response to localhost:3000/teachers
*/

/*
    Export this router
*/
module.exports = router;
