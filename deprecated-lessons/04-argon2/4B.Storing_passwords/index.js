const express = require("express");
const app = express();
const logger = require("morgan");
const connectToMongoDB = require("./db/mongodb");

app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const userRouter = require("./routes/userRouter");
app.use("/api", userRouter);

const PORT = 8888;

app.listen(PORT, () => {
  console.log(`port ${PORT} cuz we feelin fancy today`);

  connectToMongoDB();
});
