const os = require("os");
const path = require("path");
const { add, subtract, divided, multiply } = require("./math");

console.log(add(5, 10));
console.log(subtract(10, 5));
console.log(divided(10, 5));
console.log(multiply(10, 5));

// console.log(os.type())
// console.log(os.version())
// console.log(os.homedir())

// console.log(__dirname)
// console.log(__filename)

// console.log(path.dirname(__filename));
// console.log(path.basename(__filename));
// console.log(path.extname(__filename));

// console.log(path.parse(__filename))