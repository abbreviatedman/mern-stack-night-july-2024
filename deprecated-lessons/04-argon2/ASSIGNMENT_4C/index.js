/*
    IMPORTS
*/
const express = require("express");
const app = express();
const logger = require("morgan");
const path = require("path");

// #5: Import express-session and dotenv

/*
    MIDDLEWARE
*/
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));

// #5: Use the session middleware here.

/*
    ROUTES
*/
const viewRouter = require("./routes/viewRouter");
app.use("/", viewRouter);

const threadRouter = require("./routes/threadRouter");
app.use("/api/threads", threadRouter);

// #9: Plug in the userRouter, use /user as the extension

//Turn on the app
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

//initialize mongoose shenanigans
const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", false);
//connect to ye olde database (see .env file for database URI)
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("MongoDB Connected");
});
