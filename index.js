const express = require("express");
const path = require("path");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

// Custom middleware logger
app.use(logger);
const whiteList = ["https://www.google.com/"];
const corsOption = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOption));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

app.get("^/$|/index(.html)?", (req, res) => {
  // res.sendFile("./views/index.html", { root: __dirname });
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "/new-page.html");
});

// Routes Handlers
app.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("Calling middleware");
    console.log("attempted to load hello.html");
    next();
  },
  (req, res) => {
    res.send("Hello world");
  }
);

const one = (req, res, next) => {
  console.log("Calling One");
  next();
};

const two = (req, res, next) => {
  console.log("Calling tow");
  next();
};

const three = (req, res, next) => {
  res.send("Finished");
  console.log("Calling three");
  next();
};

app.get("/chain(.html)?", [one, two, three]);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not found" });
  } else {
    res.type("txt").send("404 Not found");
  }
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`server running on port: ${port}📡`);
});
