const express = require("express");
const app = express();
const serverless = require("serverless-http");

app.get("/", (req, res) => {
  res.json({
    message: "success",
  });
});

app.get("/test", (req, res) => {
  res.json({
    message: "test success",
  });
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`lambda test server running`);
});

// module.exports.handler = serverless(app)
