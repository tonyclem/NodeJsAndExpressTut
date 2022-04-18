require("dotenv").config();
// Async error handling
require("express-async-errors");
const express = require("express");
const app = express();

const connectDB = require("./db/connect");
const productsRouter = require("./routes/products");

const notFoundMiddleware = require("./middleware/error-handler");
const errorMiddleware = require("./middleware/not-found");

// middleware
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("<h1>Store API</h1><a href='/api/v1/products'>Products routes</a>");
});

app.use("/api/v1/products", productsRouter);

// products routes
app.use(notFoundMiddleware);
app.use(errorMiddleware);

// port variable
// const port = process.env.PORT || 8080;

const startServer = async () => {
  try {
    //   connect to db
    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`Server started on port ${port}.....`));
  } catch (error) {
    console.log(error);
  }
};

startServer();
