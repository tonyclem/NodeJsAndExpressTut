const fs = require("fs");
const http = require("http");

fs.readFile("index.html", (err, html) => {
  if (err) {
    throw err;
  }
  const hostname = "127.0.0.1";
  const port = 8080;

  const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write(html);
    res.end();
  });

  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
});
