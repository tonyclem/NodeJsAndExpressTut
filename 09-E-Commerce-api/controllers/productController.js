const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("../errors");
const Product = require("../models/Product");
const path = require("path");

const createProduct = async (req, res) => {
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async (req, res) => {
  const product = await Product.find({});
  res.status(StatusCodes.OK).json({ product, count: product.length });
};

const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findOne({
    _id: productId,
  });
  if (!product) {
    throw new CustomAPIError.NotFoundError(`No product with id ${productId}`);
  }
  res.status(StatusCodes.OK).json({ product });
};

const updateProduct = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new CustomAPIError.NotFoundError(`No product with id ${productId}`);
  }

  res.status(StatusCodes.OK).json({ product });
};

const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOneAndDelete({ _id: productId });
  if (!product) {
    throw new CustomAPIError.NotFoundError(`No product with id ${productId}`);
  }
  await product.remove();
  res.status(StatusCodes.OK).json({ msg: "Successfully deleted product" });
};

const uploadImage = async (req, res) => {
  const productImage = req.files.image;

  if (!productImage) {
    throw new CustomAPIError.BadRequestError("Please upload a product image");
  }

  const mixSide = 1024 * 1024;

  if (productImage.size > mixSide) {
    throw new CustomAPIError.BadRequestError(
      "Please upload image smaller than 1MB"
    );
  }

  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  );

  await productImage.mv(imagePath);
  return res
    .status(StatusCodes.OK)
    .json({ image: `/uploads/${productImage.name}` });
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
