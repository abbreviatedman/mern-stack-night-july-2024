/*
    Imports
*/
const express = require("express"); // `npm install express`
const app = express();
const path = require("path"); // module native to node

/*
    Middleware
*/
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// Allow the views to read CSS files from the public
app.use(express.static(path.join(__dirname, "public")));
// Allow smooth useage of URLs, JSON, and see requests in the console
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/*
    Routing
*/
const villagerRouter = require("./routes/villagerRouter");

app.use("/villagers", villagerRouter);

/*
    Listening
*/
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
