require("dotenv").config();
require("express-async-errors");

// Express
const express = require("express");
const app = express();

// Middleware
app.use(express.json());
// connectDB
const connectDB = require("./db/connect");

app.get("/", (req, res) => {
  res.send("<h1>Welcome to E-commerce api</h1>");
});

// Error handle
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// port
const port = process.env.PORT || 3000;

// start server

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Serve is listing on port ${port} ....`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
