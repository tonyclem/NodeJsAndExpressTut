const jwt = require("jsonwebtoken");

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

const isTokenVaild = ({ token }) => jwt.verify(token, process.env.JWT_SECERET);

module.exports = {
  createJWT,
  isTokenVaild,
};
