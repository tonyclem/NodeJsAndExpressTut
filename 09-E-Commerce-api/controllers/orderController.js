const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("../errors");

const getAllOrders = async (req, res) => {
  res.send("Get all orders");
};

const getSingleOrder = async (req, res) => {
  res.send("Get single order orders");
};

const getCurrentUserOrders = async (req, res) => {
  res.send("Get all orders");
};

const createOrder = async (req, res) => {
  res.send("Get all orders");
};

const updateOrder = async (req, res) => {
  res.send("Get all orders");
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
};
