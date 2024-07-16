/*
    Imports
*/
const express = require("express");
const app = express();
// Environment variables
require("dotenv").config();
// Logging any requests w/ colorized status codes
const logger = require("morgan");
// Connection to database
const connectToMongoDB = require("./db/mongodb");
// Prevent CORS issue
const cors = require("cors");

// 1. Update corsOptions to have ALL origins given access
const corsOptions = {
  origin: "*",
  optionSuccessStatus: 200,
};

/*
    Middleware
*/
app.use(logger("dev"));
app.use(cors(corsOptions));
// Read incoming requests property
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/*
    Routes
*/
const mcuRouter = require("./routes/mcuRouter");
app.use("/api", mcuRouter);

/*
    Server listening
*/
// const PORT = 3001;
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);

  connectToMongoDB();
});
