const http = require("http");

http
  .createServer((req, res) => {
    res.write("Hello World king Clement");
    res.end();
  })
  .listen(8080, () => console.log("Server is running on port 8080"));
