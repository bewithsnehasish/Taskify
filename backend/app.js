const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/", (req, res) => {
  res.send("hellp from backend");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
