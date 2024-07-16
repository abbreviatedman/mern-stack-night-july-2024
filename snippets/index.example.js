const express = require("express");
const app = express();
const path = require("path");
const logger = require("morgan");
const connectToMongoDB = require("./db/mongodb");
require("dotenv").config();

// Read incoming requests properly
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// logs requests to the server
app.use(logger("dev"));

/*
    ROUTES
*/
const pokemonRouter = require("./routes/pokemonRouter");
// localhost:3001/pokemon/...
app.use("/pokemon", pokemonRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`server listening on port 3001`);

  connectToMongoDB();
});
