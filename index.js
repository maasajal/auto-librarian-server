const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to Auto Librarian, a LearnEdge e-Library!");
});

app.listen(port, () => {
  console.log(`Auto Librarian server running on port ${port}!`);
});
