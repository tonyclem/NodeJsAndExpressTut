// __dirname: -path to current directory
// __filename: -path to current file name
// require: -function to use current module (file)
//  process: -info about env where the program is running
const name = require("./4-names");
const sayHello = require("./5-utils");
const data = require("./6-alternative-flavor");
require("./7-mind-grenade");
sayHello("King");
sayHello(name.john);
sayHello(name.jeff);
