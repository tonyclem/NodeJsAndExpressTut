const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("Hello World");
  } else if (req.url === "/about") {
    res.end("About page");
  }
  res.end("Error Page");
});

server.listen(5000, () => {
  console.log("Server listening on port : 5000....");
  console.log("Hello WonderFul World");
});
