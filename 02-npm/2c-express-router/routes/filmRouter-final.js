/*
    6. Import express & uuid, set up router
*/
const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

/*
    7. Create an array of your favorite films using uuidv4() for unique ID's
*/
let filmArray = [
  {
    id: uuidv4(),
    name: "Guardians of the Galaxy",
    price: 300,
  },
  {
    id: uuidv4(),
    name: "Dr. Strange & the Multiverse of Madness",
    price: 100,
  },
  {
    id: uuidv4(),
    name: "Thor",
    price: 200,
  },
  {
    id: uuidv4(),
    name: "When You Finish Saving The World",
    price: 2,
  },
];

/*
    12. Create sort method for the films
*/
function sortMethodAsc(data, sortOrder, sortBy) {
  let result;

  if (sortOrder === "asc") {
    result = data.sort((a, b) => {
      return a[sortBy] < b[sortBy] ? -1 : 1;
    });
  } else {
    result = data.sort((a, b) => {
      return b[sortBy] < a[sortBy] ? -1 : 1;
    });
  }

  return result;
}

/* shorter sorting method for next time */
/*
if(req.query.sortBy){
  let { sortBy, sortOrder } = req.query;

  if(sortOrder !== "asc") sortOrder = "desc";

  filmArray.sort((a,b) => a[sortBy] < b[sortBy] ? -1 : 1);
  if(sortOrder == "desc") filmArray.reverse();

  res.json({message: "success", payload: filmArray})
}
  
*/

/*
    8. Handle GET requests to /v1/query
*/
router.get("/v1/query", function (req, res) {
  // 13a. Gather a sortBy and/or sortOrder query
  const { sortBy, sortOrder } = req.query;

  // 13b. Check for queries
  let queryKeys = Object.keys(req.query);

  // 13c. If there are queries, sort. Otherwise, return payload
  if (queryKeys.length > 0) {
    // 13d. Check which kind of query

    // query?sortBy=name or query?sortBy=price
    let sortByQuery = sortBy === "name" ? "name" : "price";

    // query?sortOrder=asc or query?sortOrder=desc
    let sortOrderQuery = sortOrder === "asc" ? "asc" : "desc";

    let sorted = sortMethodAsc(filmArray, sortOrderQuery, sortByQuery);

    res.json({ message: "success", payload: sorted });
  } else {
    // 8a. Respond with filmArray
    res.json({ message: "success", payload: filmArray });
  } // end of 13c.
}); // end of GET /v1/query

/*
    9. Handle POST requests to /v1/create-film
*/
router.post("/v1/create-film", function (req, res) {
  // 9a. Store the body of the request
  const { name, price } = req.body;

  // 9b. Build out a new film object
  let newFilm = {
    id: uuidv4(),
    name: name,
    price: price,
  };

  // 9c. Push the new object into the local data
  filmArray.push(newFilm);
  // 9d. Show the updated data
  res.json({ message: "success", payload: newFilm });
}); // end of POST /v1/create-film

/*
    10. Handle PUT requests to /v1/update-by-id/:id
*/
router.put("/v1/update-by-id/:id", function (req, res) {
  // 10a. Store the ID from the parameters of the URL
  const { id } = req.params;

  // 10b. Find the film you want to change
  let foundFilmIndex = filmArray.findIndex((item) => item.id === id);

  // 10c. Send a failure message if the film isn't found
  if (foundFilmIndex === -1) {
    res.status(404).json({ message: "failure", payload: "film not found" });
    // 10d. Target the found film, and change it based on the req.body
  } else {
    let foundFilmObj = filmArray[foundFilmIndex];
    let incomingObj = req.body;

    //merging two objects
    Object.assign(foundFilmObj, incomingObj);

    res
      .status(200)
      .json({ message: "success", payload: filmArray[foundFilmIndex] });
  }
}); // end of PUT request to /v1/update-by-id/:id

/*
    11. Handle DELETE requests to /v1/delete-film-by-id/:id
*/
router.delete("/v1/delete-film-by-id/:id", function (req, res) {
  // 11a. Store the ID from the parameters of the URL
  const { id } = req.params;

  // 11b. Find the film you want to delete
  let foundFilmIndex = filmArray.findIndex((item) => item.id === id);

  // 11c. Send a failure message if the film isn't found
  if (foundFilmIndex === -1) {
    res.status(500).json({
      message: "failure",
      payload: "film not found",
    });
    // 11d. Target the found film, and splice it out of our data
  } else {
    let deletedFilm = filmArray.splice(foundFilmIndex, 1);

    res.status(200).json({ message: "success", payload: deletedFilm });
  }
}); // end of DELETE request to /v1/delete-film-by-id/:id

/*
  8b. Export the router
*/
module.exports = router;
