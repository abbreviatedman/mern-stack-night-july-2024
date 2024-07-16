/*
    1. Import express & Morgan, set up app variable
*/
const express = require("express");
const logger = require("morgan");
const app = express();

/*
    2. Set up middleware to read requests better
*/
// Helps to see incoming req.body object
app.use(express.json());
// Colorizes status codes
app.use(logger("dev"));
// Allows us to parse form data
app.use(express.urlencoded({ extended: false }));

/*
    3. Set up local data to work with
*/
let pokeData = [{ id: 1, name: "pikachu", type: "electric", number: 25 }];

/*
    4. Handle GET requests to localhost:3000/
*/
app.get("/", (req, res) => {
  /*
    5. Set up the ability to query for a specific item in the data set
  */
  // 5a. Collect the query from the request object
  let ObjectKeys = Object.keys(req.query);

  // 5b. Set up for if a query exists
  if (ObjectKeys.length > 0) {
    // 5c. Use findIndex() to return the index of the first element that passes a test (provided by a function)
    let foundPokemonIndex = pokeData.findIndex(
      (item) => item.name === req.query.name
    ); // req.query is the ?name=pikachu in the URL

    // 5d. If the pokemon's index isn't found, send back a failure message
    if (foundPokemonIndex === -1) {
      res.status(500).json({
        message: "failure",
        payload: "pokemon not found",
      });
      // 5e. if the pokemon IS found, send back a success message, with the pokemon that was found
    } else {
      res
        .status(200)
        .json({ message: "success", payload: pokeData[foundPokemonIndex] });
    } // end of if/else statement when query exists

    // 4a. respond with the entire pokeData object if you DON'T input pokemon
  } else {
    res.status(200).json({ message: "success", payload: pokeData });
  } // end of if/else a query exists
}); // end of Get "/"

/*
    6. Handle POST requests to localhost:3000/
*/
app.post("/", (req, res) => {
  // 6a. Search to see if the pokemon already exists in the data
  let foundPokemonIndex = pokeData.findIndex(
    (item) => item.name === req.body.name
  );

  console.log(req.body);

  // 6b. Send back a failure if you try to put in a pokemon that exists already
  if (foundPokemonIndex !== -1) {
    res.status(500).json({
      message: "failure",
      payload: "Pokemon already exists cannot add",
    });
    // 6c. Save the pokemon if it doesn't exist yet
  } else {
    pokeData.push(req.body);

    res.status(200).json({ message: "success", payload: pokeData });
  } // end of if/else statement
}); // end of Post "/"

/*
    7. Handle PUT requests to localhost:3000/:name
*/
app.put("/:name", (req, res) => {
  //params /:name its dynamic

  // 7a. Find the pokemon you want to change
  let foundPokemonIndex = pokeData.findIndex(
    (item) => item.name === req.params.name
  );

  // 7b. Send a failure message if pokemon isn't found
  if (foundPokemonIndex === -1) {
    res.status(500).json({
      message: "failure",
      payload: "pokemon not found",
    });
    // 7c. Target a pokemon, and change the object with a new object
  } else {
    //let copy = Object.assign(a, b)

    let pokeObj = pokeData[foundPokemonIndex];
    let incomingObj = req.body;

    // console.log(pokeObj)

    //merging two objects
    Object.assign(pokeObj, incomingObj);

    // console.log(pokeObj);

    // for (const property in pokeObj) {
    //   for (const key in incomingObj) {
    //     if (key === property) {
    //       pokeObj[property] = incomingObj[key];
    //     }
    //   }
    // }

    res.status(200).json({ message: "success", payload: pokeData });
  } // end of if/else statement
}); // end of PUT "/:name"

/*
    8. Handle DELETE requests to localhost:3000/name
*/
app.delete("/:name", (req, res) => {
  // 8a. Find the pokemon you want to delete
  let foundPokemonIndex = pokeData.findIndex(
    (item) => item.name === req.params.name
  );

  // 8b. Send a failure if the pokemon isn't found
  if (foundPokemonIndex === -1) {
    res.status(500).json({
      message: "failure",
      payload: "pokemon not found",
    });
    // 8c. Remove the found pokemon and send a success message
  } else {
    pokeData.splice(foundPokemonIndex, 1);

    res.status(200).json({ message: "success", payload: pokeData });
  } // end of if/else statement
}); // end of DELETE "/:name"

/*
    9. Handle any unhandled URL extensions as an error
*/
app.all("*", (req, res) => {
  res.status(404).send("<h1>page not found</h1>");
});

/*
    4b. Set up PORT and begin listening to requests
*/
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
