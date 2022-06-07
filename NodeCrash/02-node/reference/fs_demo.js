const fs = require("fs");
const path = require("path");

// create a folder
// fs.mkdir(path.join(__dirname, "test"), {}, (err) => {
//   if (err) throw err;
//   console.log("Folder created");
// });

// fs.writeFile(
//   // this is a synchronous method to write a file
//   path.join(__dirname, "test", "hello.txt"),
//   "Hello World! ",
//   (err) => {
//     if (err) throw err;
//     console.log("File not created");

//     fs.appendFile( // this is an asynchronous method to append a file
//       // this is a synchronous method to write a file
//       path.join(__dirname, "test", "hello.txt"),
//       "I love node.js",
//       (err) => {
//         if (err) throw err;
//         console.log("File not created");
//       }
//     );
//   }
// );

// Read a file and print it to the console
// fs.readFile(path.join(__dirname, "test", "hello.txt"), "utf8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// rename File or Folder
fs.rename(
  path.join(__dirname, "test", "hello.txt"),
  path.join(__dirname, "test", "hello2.txt"),
  (err) => {
    if (err) throw err;
    console.log("File renamed");
  }
);
