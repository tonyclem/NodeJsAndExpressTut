require("dotenv").config();

const express = require("express");
const app = express();

// connectDB
const connectDB = require("./db/connect");

const port = process.env.PORT || 3000;

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
