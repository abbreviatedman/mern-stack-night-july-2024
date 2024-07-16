const express = require("express");
const router = express.Router();
const axios = require("axios"); // `npm install axios`

// localhost:3000/villagers/
router.get("/", async (req, res) => {
  // testing if we can render ejs
  // res.render("home");

  // testing if we can render ejs with data
  // res.render("home", {fillerData: "this is just a test"});

  // test that axios works
  // try {
  //     let allVillagers = await axios.get("https://acnhapi.com/v1/villagers");

  //     res.render("home", {villagers: allVillagers.data.bea14.name["name-USen"]});
  // } catch (error) {
  //     console.log(error)
  // }

  // actually render the page with all the data
  try {
    // we're formatting the data we get back to be an array of objects, instead of an object filled with other objects
    let allVillagers = await axios.get("https://acnhapi.com/v1/villagers");

    let propertyArray = Object.keys(allVillagers.data); // => ['ant00', 'ant01', 'ant02', ...]

    let villagersArray = []; // will contain our reformatted data

    for (let i = 0; i < propertyArray.length; i++) {
      let propName = propertyArray[i]; // 'ant00'

      let oneProp = allVillagers.data[propName]; // {"id": 1, "filename": "ant00", ...}

      villagersArray.push(oneProp);
    }

    res.render("home", { villagers: villagersArray });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
