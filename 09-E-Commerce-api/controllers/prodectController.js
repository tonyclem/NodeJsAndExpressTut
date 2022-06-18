const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("../errors");
const Product = require("../models/Product");

const createProduct = async (req, res) => {
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async (req, res) => {
  res.send("get all products");
};

const getSingleProduct = async (req, res) => {
  res.send("getSingleProduct products");
};

const updateProduct = async (req, res) => {
  res.send("updateProduct all products");
};

const deleteProduct = async (req, res) => {
  res.send("deleteProduct products");
};

const uploadImage = async (req, res) => {
  res.send("uploadImage for all products");
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
