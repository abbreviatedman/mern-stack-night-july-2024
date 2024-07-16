/*
    1. Import Express, Morgan, Path, and set up app variable
*/
const express = require("express");
const app = express();
const logger = require("morgan");
const path = require("path");

/*
    2. Set up middleware
*/
// view engine setup
app.set("view engine", "ejs");
// set the "views" of the application to use the views folder
app.set("views", path.join(__dirname, "views"));
// allows local CSS to be targeted
app.use(express.static(path.join(__dirname, "public")));

// middleware for JSON testing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logger("dev"));

/*
    4. Import Router files
*/
// const indexRouter = require("./routes/indexRouter");
const indexRouter = require("./routes/final-Router");

/*
    5. Set up the URL routes to connect to the router
*/
app.use("/", indexRouter);

/*
    3. Set up the port and begin listening
*/
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}....`);
});
