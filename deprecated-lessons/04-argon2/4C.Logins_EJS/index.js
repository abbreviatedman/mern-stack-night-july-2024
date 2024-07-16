const express = require("express");
const app = express();
const logger = require("morgan");
const connectToMongoDB = require("./db/mongodb");

// path for EJS
const path = require("path");
// session module
const session = require("express-session");
// dotenv config to use the secret key
require("dotenv").config();

// EJS middleware
// The view engine to use ejs, and serve from the views folder
app.set("view engine", "ejs");
// When doing res.render(), look in the 'views' folder
app.set("views", path.join(__dirname, "views"));
// Allow the views to read CSS files from the public folder
app.use(express.static(path.join(__dirname, "public")));

app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// session middleware
app.use(
  session({
    secret: process.env.SECRET_SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    },
  })
);

const viewRouter = require("./routes/viewRouter");
app.use("/", viewRouter);

const userRouter = require("./routes/userRouter");
app.use("/api", userRouter);

const PORT = 8888;

app.listen(PORT, () => {
  console.log(`port ${PORT} cuz we feelin fancy today`);

  connectToMongoDB();
});
