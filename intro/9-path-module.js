const path = require("path");

console.log("1", path.sep);

const filePath = path.join("/content/", "subfolder", "text.txt");
console.log("2", filePath);

const base = path.basename(filePath);
console.log("3", base);

const absolute = path.resolve(__dirname, "content", "subfolder", "test.txt");
console.log("4", absolute);
