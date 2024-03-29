const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const ExpressError = require("./utils/ExpressError");
require("dotenv").config();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
  })
);

const books = require("./routes/books");
const authors = require("./routes/authors");
const reviews = require("./routes/reviews");
app.use("/books", books);
app.use("/authors", authors);
app.use("/books/:id/reviews", reviews);

app.all("*", (req, res, next) => {
  next(new ExpressError("Route Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) {
    err.message = "Oh No, Something Went Wrong!";
  }
  res.status(statusCode).send({ err });
});

const dbConnData = {
  host: process.env.MONGO_HOST,
  port: process.env.MONGO_PORT,
  database: process.env.MONGO_DATABASE,
};

mongoose
  .connect(
    `mongodb://${dbConnData.host}:${dbConnData.port}/${dbConnData.database}`
  )
  .then((response) => {
    console.log(
      `Connected to MongoDB. Database name: "${response.connections[0].name}"`
    );
    const apiPort = process.env.PORT;
    const apiHost = process.env.API_HOST;
    app.listen(apiPort, () => {
      console.log(`API server available from: http://${apiHost}:${apiPort}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });

process.env.NODE_ENV === "development" && mongoose.set("debug", true);
