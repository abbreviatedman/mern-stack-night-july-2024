/*
    1. Import express & Morgan, set up app variable
*/
const express = require("express");
const logger = require("morgan");
const app = express();

/*
    2. Set up middleware
*/
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logger("dev"));

/*
    3. Import Router files
*/
const filmRouter = require("./routes/filmRouter");

/*
    4. Set up the URL routes to connect to each router
*/
// localhost:3000/api/film
app.use("/api/film", filmRouter);

/*
    5. Set up the port and begin listening
*/
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}....`);
});
