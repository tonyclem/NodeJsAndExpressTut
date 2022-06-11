const express = require("express");
const app = express();

// get the data from the database folder
const { products } = require("./data");

app.get("/", (req, res) => {
  res.send('<h1>Home Page </h1><a href="/api/products">products</a>');
});

app.get("/api/products", (req, res) => {
  const newProducts = products.map((product) => {
    // Exacting the produce from the data
    const { id, name, image } = product;
    return { id, name, image };
  });
  res.json(newProducts);
});

app.get("/api/products/:productID", (req, res) => {
  // console.log(req);
  // console.log(req.params);
  // passing the valuables, to req.params and to select all the id with number
  const { productID } = req.params;
  const singleProducts = products.find(
    (product) => product.id === Number(productID)
  );
  // if the singleProduct is not true, return the error
  if (!singleProducts) {
    return res.status(404).send("product not found");
  }
  res.json(singleProducts);
});

// more than one route, with string
app.get("/api/products/:productID/reviews/:reviewID", (req, res) => {
  console.log(req.params);
  res.send("hello World");
});

app.get("/api/v1/query", (req, res) => {
  // console.log(req.query)
  const { search, limit } = req.query;
  let sortedProducts = [...products];

  // if the search is true, then filter the products that match the search input
  if (search) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.name.startsWith(search); // startsWith same as includes
    });
  }
  // if the limit is true, and the limit is a number
  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit));
  }
  // if the length of sortedProducts is 0, return success
  if (sortedProducts.length < 1) {
    // res.status(200).send('no products matched your search');
    return res.status(200).json({ success: true, data: [] });
  }
  res.status(200).json(sortedProducts);
});

app.listen(5000, () => {
  console.log("Server is listing on port 5000......");
});
