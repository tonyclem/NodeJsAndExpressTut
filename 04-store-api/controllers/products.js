const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({
    price: { $gt: 30 },
  })
    .sort("price")
    .select("name price");

  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query; // this line is for the query string in the url, and the body of the request, all the name inside the object contains the name of properties in the query string.
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  if (company) {
    queryObject.company = company;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  // numeric filters
  // if (numericFilters) {
  //   const filters = JSON.parse(numericFilters);
  //   const { filters: filterObject } = filters;
  //   const { gt, lt } = filterObject;
  //   if (gt) {
  //     queryObject.price = { $gt: gt };
  //   }

  //   if (lt) {
  //     queryObject.price = { $lt: lt };
  //   }
  // }

  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    }; // this is an object that maps the operator to the mongo operator
    // const regEx = /^(\d+)([><=]+)(\d+)$/;
    const regEx = /\b(<|>|>=|=|<|<=)\b/g; // this is a regular expression that matches the operator
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    ); // this is a regular expression that replaces the operator with the mongo operator

    const options = ["price", "rating"]; // this is an array that contains the name of the properties that we want to filter, which is number values
    filters = filters.split(",").forEach((item) => {
      // split the string into an array
      const [field, operator, value] = item.split("-"); // this is an array that contains the name of the property, the operator and the value

      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) }; // this is an object that contains the name of the property and the value of the property
      }
    });
  }

  // sort
  let result = Product.find(queryObject); // pass the queryObject to the find method, and pass the product models to the find method.
  if (sort) {
    const sortList = sort.split(",").join(" "); // split the string into an array, and join the array into a string, and add a space between the elements.
    result = result.sort(sortList); // sort the result by the sortList.
  } else {
    result = result.sort("createdAt"); // sort the result by the createdAt property.
  }

  // fields
  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList); // select the fieldsList from the result.
  }

  const page = Number(req.query.page) || 1; // if the page is not a number, or if the page is not defined, then set the page to 1.
  const limit = Number(req.query.limit) || 10; // if the limit os not a number,  then set it to a number. and the limit as to be 10 by default.
  const skip = (page - 1) * limit; // page minus one from the page , and multiply it by the limit.

  result = result.skip(skip).limit(limit); // skip the first number of the documents, and limit the number of documents to the limit.

  const products = await Product.find(req.query);
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
