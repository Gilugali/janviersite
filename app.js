require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
const connectMongo = require("./server/config/db");
const cookieParser = require("cookie-parser");
const mongoStore = require("connect-mongo");
const session = require("express-session");
const port = process.env.PORT || 5000; // Corrected the order of conditions

// Connect to Db
connectMongo();

// Middleware
app.use(expressLayouts);
app.set("layout", "./layouts/main");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(cookieParser());

const mongoUrl = process.env.MONGO_URI;

app.use(
  session({
    secret: "kukuriku",
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({ mongoUrl }), // Corrected the way of creating mongoStore instance
    cookie: { secure: false }
  })
);

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use("/", require("./server/routes/main"));
app.use("/", require("./server/routes/admin"));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
