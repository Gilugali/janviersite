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
const port = 5000 || process.env.PORT;

//connect to Db
connectMongo();
//middleware
app.use(expressLayouts);
app.set("layout", "./layouts/main");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(cookieParser());
app.use(
  session({
    secret: "kukuriku",
    resave: false,
    saveUninitialized: true,
    store: mongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use("/", require("./server/routes/main"));
app.use("/", require("./server/routes/admin"));
// app.use("/", require("./server/routes/teacher"))

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
