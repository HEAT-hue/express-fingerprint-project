// jshint esversion:6
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const router = require("./routes/index");

const app = express();

// Require dotenv
require("dotenv").config();

// Connect to the DB
require("./DB/connectDB")();

// Allow CORS policy on all routes
app.use(cors());

// Log all requests to console
app.use(morgan("dev"));

// Parse JSON data
app.use(express.json());

// Parse form encoded URL data
app.use(express.urlencoded({ extended: true }));

// Router to handle all routes
app.use("/", router);

// PORT to listen for connections
const PORT = process.env.PORT;

// listen for requests on specified port
app.listen(PORT, "192.168.137.1" | "localhost", () => {
  console.log(`Server running on port ${PORT}`);
});
