require("dotenv").config();

const connectDB = require("./db/connect"); // connect to db
const Product = require("./models/product"); // set the models in order to populate the db

const jsonProducts = require("./products.json"); // get the products from the json array and pass it to the model Product

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URL); // connect to db
    await Product.deleteMany(); // delete all products in the array, start from scratch
    await Product.create(jsonProducts); // create products from the json array and pass it to the model Product
    console.log("Connected to DB !!!");
    process.exit(0); //if we are successful, exit the process ? zero means success
  } catch (error) {
    console.log(error);
    process.exit(1); // if not, exit the process ? one means error
  }
};

startServer();

// this function add the products from the json array to the model Product and connect it to the database
