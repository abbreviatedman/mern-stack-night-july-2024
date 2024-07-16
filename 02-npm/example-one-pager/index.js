/*
    IMPORTS
*/
const express = require("express");
const app = express();
const logger = require("morgan");
const path = require("path");

/*
    MIDDLEWARE
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
    ROUTES
*/
const searchRouter = require("./routes/searchRouter");
app.use("/", searchRouter);

/*
    PORT
*/
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server is up`);
});
