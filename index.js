const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/config");
const colors = require("colors");

dotenv.config();

// Connecting to mongodb server
connectDB();

// express application
const app = express();
// Body Parser middleware, no need to install body-parser package
app.use(express.json());

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("<h1>Welcome to node server</h1>");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`.cyan);
});
