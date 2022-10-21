const express = require("express");
const path = require("path");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const corsOption = require("./config/corsOptions");

const app = express();
const port = process.env.PORT || 5000;

// Custom middleware logger
app.use(logger);

app.use(cors(corsOption));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// serve static files
app.use("/", express.static(path.join(__dirname, "/public")));
 

// routes
app.use("/", require("./routes/root"));
app.use("/employees", require("./routes/api/employees"));

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
