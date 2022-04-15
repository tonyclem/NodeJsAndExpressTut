const notFound = (req, res, next) => {
  res.status(404).send("Router does not exist");
};

module.exports = notFound;
