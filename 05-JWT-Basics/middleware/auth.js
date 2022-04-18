const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // check if the token is not valid or not started with Bearer token
    throw new UnauthenticatedError("Invalid token");
  }

  const token = authHeader.split(" ")[1]; // get the token from the header but index 1

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // verify the token and pass the secret key to prevent it to appear in the public

    const { id, username } = decoded; // destructuring the decoded token
    req.user = { id, username }; // add the user to the request object
    next();
  } catch (error) {
    throw new UnauthenticatedError("Not Authorizes to access this route");
  }
};

module.exports = authenticationMiddleware;
