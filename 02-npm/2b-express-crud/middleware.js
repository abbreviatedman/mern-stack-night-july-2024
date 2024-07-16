const express = require("express");
const app = express();

app.use((request, response, next) => {
  console.log(request.headers);
  next(); // move to the next function
});

app.use((request, response, next) => {
  request.chance = Math.random() * 10;
  console.log(request.chance);
  next(); // move to the next function
});

app.get("/", (request, response) => {
  response.json({
    chance: request.chance,
  });
});

app.listen(3000);
