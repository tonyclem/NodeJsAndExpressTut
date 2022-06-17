require("dotenv").config();
require("express-async-errors");

const morgan = require("morgan");
// Express
const express = require("express");
const app = express();

// Middleware Express
// connectDB
const connectDB = require("./db/connect");

// routers
const authRouter = require("./routes/authRoutes");

// Error handle
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(morgan("tiny"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Welcome to E-commerce Api</h1>");
});

app.use("/api/v1/auth", authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// port
const port = process.env.PORT || 5000;

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
