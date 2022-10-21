const http = require("http");
const Path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

const logEvents = require("./logEvents");
const EventEmitter = require("events");

class Emiter extends EventEmitter {}

const myEmiter = new Emiter();
myEmiter.on("log", (msg, fileName) => logEvents(msg, fileName));
const port = process.env.PORT || 5000;

const serveFile = async (filePath, contentType, response) => {
  try {
    const rawData = await fsPromises.readFile(
      filePath,
      !contentType.includes("image") ? "UTF-8" : ""
    );
    const data =
      contentType === "application/json" ? JSON.parse(rawData) : rawData;
    response.writeHead(filePath.includes("404.html") ? 404 : 200, {
      "Content-Type": contentType,
    });
    response.end(
      contentType === "application/json" ? JSON.stringify(data) : data
    );
  } catch (error) {
    console.log(error);
    myEmiter.emit("log", `${error.name}: ${error.message}`, "errorLog.txt");
    response.statusCode = 500;
    response.end();
  }
};

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  myEmiter.emit("log", `${req.url}\t${req.method}`, "reqLog.txt");

  const extension = Path.extname(req.url);
  let contentType;

  switch (extension) {
    case ".css":
      contentType = "text/css";
      break;

    case ".js":
      contentType = "text/javascript";
      break;

    case "json":
      contentType = "application/json";
      break;

    case ".jpg":
      contentType = "image/jpeg";
      break;

    case ".png":
      contentType = "image/png";
      break;

    case ".txt":
      contentType = "text/plane";
      break;

    default:
      contentType = "text/html";
  }

  let filePath =
    contentType === "text/html" && req.url === "/"
      ? Path.join(__dirname, "views", "index.html")
      : contentType === "text/html" && req.url.slice(-1) === "/"
      ? Path.join(__dirname, "views", req.url, "index.html")
      : contentType === "text/html"
      ? Path.join(__dirname, "views", req.url)
      : Path.join(__dirname, req.url);

  if (!extension && req.url.slice(-1) !== "/") filePath += ".html";

  const fileExists = fs.existsSync(filePath);

  if (fileExists) {
    serveFile(filePath, contentType, res);
  } else {
    switch (Path.parse(filePath).base) {
      case "old-page.html":
        res.writeHead(301, { Location: "/new-page.html" });
        req.end();
        break;

      case "www-page.html":
        res.writeHead(301, { Location: "/" });
        req.end();
        break;

      default:
        serveFile(Path.join(__dirname, "views", "404.html"), "text/html", res);
    }
  }

  // let path;
  // switch (req.url) {
  //   case "/":
  //     res.statusCode = 200;
  //     path = Path.join(__dirname, "views", "index.html");
  //     fs.readFile(path, "utf-8", (err, data) => {
  //       res.end(data);
  //     });
  //     break;
  // }
});

server.listen(port, () => {
  console.log(`Server running on localhost:${port}/`);
});
