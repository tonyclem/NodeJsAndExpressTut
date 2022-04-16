const express = require("express");
const router = express();

const {
  getAllProducts,
  getAllProductsStatic,
} = require("../controllers/products"); // export the function getAllProducts to the router

// routes for products
router.route("/").get(getAllProducts);
router.route("/static").get(getAllProductsStatic);

module.exports = router;

//  this function is for the products routes / and static routes /static the main production
