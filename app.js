const express = require("express");
const path = require("path");
const logger = require("morgan");
const winston = require("./logger").logger;
const fileUpload = require("express-fileupload");

const mongoose = require("mongoose");

const app = express();

// Connect to Database
// Retrieve DB URI
const dbURL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_COLLECTION}.pazwr.mongodb.net/?retryWrites=true&w=majority`;

//Create DB Connection, log errors if present
mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DB_NAME,
  })
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch((err) => {
    console.log(err);
  });

// Enable File uploads
app.use(
  fileUpload({
    createParentPath: true,
    limits: {
      fileSize: 2 * 1024 * 1024 * 1024, //2MB max file(s) size
    },
  })
);

// Initialize logging system
app.use(logger("combined", { stream: winston.stream }));

// Use required parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * * Description - Set directory for views and view engine
 *
 *   @Date - 2023-08-31
 *   @Author - Micheal Ogden
 */
process.env.SET_ENV === "template";

if (process.env.SET_ENV === "template") {
  app.use(express.static(path.join(__dirname, "public/server-msgs")));
  app.set("views", path.join(__dirname, "public/server-msgs"));
} else if (process.env.SET_ENV === "development") {
  app.use(express.static(path.join(__dirname, "public/dev")));
} else if (process.env.SET_ENV === "production") {
  app.use(express.static(path.join(__dirname, "public/prod")));
}

app.use(express.static(path.join(__dirname, "public/server-msgs/index.html")));

// Set view engine

app.set("view engine", "ejs");

/**
 * * Description - ROUTES: VIEWS - Routes for views
 *
 */
app.get("/datainitial", async (req, res) => {
  await res.json({
    msg: "Data Initial",
    title: "Express Template App",
    status: 200,
  });
});

app.get("/home", async (req, res) => {
  await res.render("home", { title: "Home", status: 200 });
});

app.get("/error", async (req, res) => {
  const err = new Error("This is a test error");
  await res.render("err-page", {
    title: `Error: ${err.status || "error"} || 500`,
    status: err.status || 500,
    msg: err.message || "Internal Server Error",
  });
});

app.get("/", async (req, res) => {
  res.redirect("/home");
});

// catch 404 and forward to error handler
app.all("*", async (req, res) => {
  res
    .status(404)
    .render("404", { url: req.url, status: 404, msg: "Page not found" });
});

// Server wide error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).render("err-page", {
    title: `Error: ${err.status} || 500`,
    status: err.status,
    msg: err.message,
  });
});

module.exports = app;
