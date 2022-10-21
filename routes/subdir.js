const express = require("express");
const path = require("path");
const router = express.Router();

router.get("^/$|/index(.html)?", (req, res) => {
  // res.sendFile("./views/index.html", { root: __dirname });
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

router.get("^/$|/test(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "test.html"));
});

module.exports = router;
