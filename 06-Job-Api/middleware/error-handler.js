// const { CustomAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

// error handler
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong try again later",
  };

  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message });
  // } // we can use the down below code to handle the error as well

  if (err.name === "ValidatorError") {
    customError.message = Object.values(err.errors)
      .map((error) => error.message)
      .join(","); // this will return the error message inside the object,
    customError.statusCode = 400;
  }

  if (err.code && err.code === 11000) {
    customError.message = `Duplicate values entered for ${Object.keys(
      err.keyValue
    )} field, please chooses another value`;
    customError.statusCode = 400;
  }

  // if error is CastError
  if (err.name === "CastError") {
    customError.message = `No item found with is id: ${err.value}`;
    customError.statusCode = 404;
  }

  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
  return res.status(customError.statusCode).json({ msg: customError.message });
};

module.exports = errorHandlerMiddleware;
