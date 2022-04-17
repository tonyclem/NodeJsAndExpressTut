const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");

const login = async (req, res) => {
  const { username, password } = req.body; // destructuring the request body
  // mongoose validation
  // Joi
  // check in the controller
  if (!username || !password) {
    throw new CustomAPIError("Username and password are required", 400);
  }

  //just for demo, normally provided by DB!!!!
  const id = new Date().getDate();

  // try to keep payload small, better experience for user
  // just for demo, in production use long, complex and unguessable string value!!!!!!!!!
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(200).json({
    msg: `User created`,
    token,
  });
  console.log(username, password);
};

const dashboard = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // check if the token is not valid or not started with Bearer token
    throw new CustomAPIError("Invalid token", 401);
  }

  const token = authHeader.split(" ")[1]; // get the token from the header but index 1

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // verify the token and pass the secret key to prevent it to appear in the public

    const luckyNumber = Math.floor(Math.random() * 100);

    res.status(200).json({
      msg: `Hello ${decoded.username}`,
      secret: `Here is your authorized data, your lucky number is ${luckyNumber} And Happy coding! as well as Happy Easter`,
    });
  } catch (error) {
    throw new CustomAPIError("Not Authorizes to access this route", 401);
  }
};

module.exports = {
  login,
  dashboard,
};

// this file is too generated randomly, numbers
