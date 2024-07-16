const express = require("express");
const bodyParser = require("body-parser");
const { validate } = require("deep-email-validator");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/validate-email", async (req, res) => {
  const { email } = req.body;

  // Validate the email address
  const { valid, reason, validators } = await validate(email);

  if (valid) {
    res.json({ valid: true, email });
  } else {
    res.status(400).json({ valid: false, reason, validators });
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
