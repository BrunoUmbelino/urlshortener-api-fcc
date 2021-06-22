require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const Routes = require("./src/Routes");

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(Routes);

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
