const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  // create a new schema
  name: {
    type: String,
    required: [true, "Product name is required"],
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5, // default value
  },
  createdAt: {
    type: Date,
    default: Date.now(), // get current time
  },
  company: {
    type: String,
    enum: {
      // enum is a mongoose method that allows you to set a list of values
      values: ["ikea", "liddy", "caressa", "marcos"],
      message: "{VALUE} is not a valid company",
    },
  },
});

module.exports = mongoose.model("Product", productSchema);
