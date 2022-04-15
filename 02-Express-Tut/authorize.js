const authorize = (req, res, next) => {
  const { user } = req.query;
  if (user === "admin") {
    req.user = { name: "admin", id: 4 };
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};

module.exports = authorize;
