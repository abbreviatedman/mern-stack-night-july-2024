/*
  0a. In terminal, initialize the project:
  npm init -y
*/

/*
  0b. In terminal, install the express module using the following command:
  npm install express
*/

/*
    1. Import the express module, and prepare a ready-to-use variable for it
*/
const express = require("express"); // Import the module
const app = express(); // Ready-to-use variable

/*
    4. Set up a response to localhost:3000/
*/
app.get("/", (req, res) => {
  console.log("user hit the resource");
  res.status(200).send("Home Page"); // send the client the text "Home Page" with a success status
});

/*
    5. Set up a response to localhost:3000/about
*/
app.get("/about", (req, res) => {
  res.status(200).send("About Page"); // send the client the text "About Page" with a success status
});

/*
    6. Set up a response to localhost:3000/*
*/
// * means all, any page that isn't listed so far. So if you reach localhost:3000/* this should be the response
app.all("*", (req, res) => {
  res.status(404).send("<h1>page not found</h1>"); // send the client "page not found" with a not found status
});

/*
    2. Set the Port we want to use
*/
const PORT = 3000; // 3000 and 8080 are commonly used ports for development

/*
    3. Set the application to begin listening / begin spinning the server
*/
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
