const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("../errors");

const { checkPermissions } = require("../utils");

const Review = require("../models/Review");
const Product = require("../models/Product");

const createReview = async (req, res) => {
  const { product: productId } = req.body;

  const isValidProduct = await Product.findOne({ _id: productId });

  if (!isValidProduct) {
    throw new CustomAPIError.NotFoundError("No product with id " + productId);
  }

  const alreadySubmitted = await Review.findOne({
    product: productId,
    user: req.user.userId,
  });

  if (alreadySubmitted) {
    throw new CustomAPIError.BadRequestError(
      "Already submitted review for this product"
    );
  }

  req.body.user = req.user.userId;

  const review = await Review.create(req.body);
  res.status(StatusCodes.CREATED).json({ review });
};

const getAllReviews = async (req, res) => {
  const review = await Review.find({});
  res.status(StatusCodes.OK).json({ review, count: review.length });
};

const getSingleReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new CustomAPIError.NotFoundError(
      `No review found with this id ${reviewId}`
    );
  }

  res.status(StatusCodes.OK).json({ review });
};

const updateReview = async (req, res) => {
  res.send("updateReview review");
};

const deleteReview = async (req, res) => {
  res.send("delete review");
};

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};