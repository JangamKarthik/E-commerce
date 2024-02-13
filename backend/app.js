const express = require("express");

const app = express();

app.use(express.json())

//importing middleware
const errorMiddleware = require("./middleware/error")

//importing routes

const product = require("./routes/productRoute");

app.use("/api/v1",product);

//Middleware for error handling
app.use(errorMiddleware);

module.exports = app;