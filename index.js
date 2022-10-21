const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

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

app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(port, () => {
  console.log(`server running on port: ${port}📡`);
});
