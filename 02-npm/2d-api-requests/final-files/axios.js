/*
    9. Import `express` and `axios`
*/
const express = require("express");
const app = express();
const axios = require("axios");

/*
    11. Write an asynchronous function to respond to requests at `localhost:3000/:query`
*/
app.get("/:query", async (req, res) => {
  // Store the dynamic parameter
  let query = req.params.query;

  // Try block in case an error breaks our code
  try {
    // We await the axios promise, it's resolved in the variable findMovies
    let findMovies = await axios.get(
      `https://api.themoviedb.org/3/search/multi?api_key=a4cae43902da506229d8148bcfc7364c&language=en-US&query=${query}`
    );

    console.log("getting your movies");

    // If the search works, we send back the data
    res.status(200).json({
      message: "success",
      payload: findMovies.data.results,
    });
    // If there's an error, we send that back instead
  } catch (err) {
    res.status(500).json({
      message: "error",
      payload: err,
    });
  }
});

/*
    10. Set up the server's ability to listen to requests
*/
const PORT = 3000;

app.listen(PORT, () => console.log(`server listening on ${PORT}`));
