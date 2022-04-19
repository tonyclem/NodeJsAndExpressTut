const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // check if the token is not valid or not started with Bearer token
    throw new UnauthenticatedError("UnAuthentication Invalid ");
  }

  const token = authHeader.split(" ")[1]; // get the token from the header but index 1

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET); // verify the token and pass the secret key to prevent it to appear in the public

    const user = await User.findById(payload.userId).select("-password"); // find the user by the id in the payload
    req.user = user; // add the user to the request
    // add the user to the request object
    // req.user = { userId: payload.userId, username: payload.name }; // same as above code
    next();
  } catch (error) {
    throw new UnauthenticatedError("Not Authorizes to access this route");
  }
};

module.exports = authenticationMiddleware;
