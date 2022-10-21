const fsPromises = require("fs").promises;
const path = require("path");

console.log("Hello...💥");

const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "files", "car.txt"),
      "utf-8"
    );
    console.log(data);
    await fsPromises.writeFile(
      path.join(__dirname, "files", "newCar.txt"),
      data
    );
    await fsPromises.appendFile(
      path.join(__dirname, "files", "newCar.txt"),
      "\n\nFord Mustang GT-500"
    );
    await fsPromises.rename(
      path.join(__dirname, "files", "newCar.txt"),
      path.join(__dirname, "files", "RenameNewCar.txt")
    );

    const newData = await fsPromises.readFile(
      path.join(__dirname, "files", "promiseComplete.txt"),
      "utf-8"
    );
    console.log(newData);
  } catch (error) {
    console.error(error);
  }
};

fileOps();

// fs.readFile(path.join(__dirname, "files", "lorem.txt"), "utf8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// fs.writeFile(
//   path.join(__dirname, "files", "reply.txt"),
//   "Nice to meet you😊",
//   (err) => {
//     if (err) throw err;
//     console.log("File created");
//   }
// );

// fs.readFile(
//   path.join(__dirname, "files", "reply.txt"),
//   "utf-8",
//   (err, data) => {
//     if (err) throw err;
//     console.log(data);
//   }
// );

// fs.appendFile(
//   path.join(__dirname, "files", "car.txt"),
//   "lamborghini",
//   (err) => {
//     if (err) throw err;
//     console.log("Append file");
//   }
// );

process.on("uncaughtException", (err) => {
  console.error(`There was an uncaught error: ${err}`);
  process.exit(1);
});
