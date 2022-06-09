const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("<h1>Home Page</h1>");
  }
  if (req.url === "/about") {
    // blocking code
    for (let i = 0; i < 50; i++) {
      for (let j = 0; j < 50; j++) {
        console.log(`${i} ${j}`);
      }
    }
    res.end(`<h1>About Page </h1>`);
  }
  res.end("Error Page");
});

server.listen(5000, () => {
  console.log("Server listening on port : 5000....");
});
