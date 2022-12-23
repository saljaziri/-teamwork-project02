const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

path = require('path');
fs = require('fs');
const port = process.env.PORT;
const app = express();
global.__basedir = __dirname;


app.use(express.static("public"));

const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);
let session = require("express-session");
let passport = require("./helper/ppConfig");
app.use(
  session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 36000000 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

const playerRoute = require("./routes/players");
const authRoute = require("./routes/auth");
const userProfileRoute = require("./routes/userProfile");
const dreamClubRoute = require('./routes/dreamClubs');
const indexRoute = require('./routes/index')
const clubRoute = require('./routes/clubs');

app.use("/", indexRoute);
app.use("/", playerRoute);
app.use("/", authRoute);
app.use("/", userProfileRoute);
app.use('/', dreamClubRoute);
app.use('/', clubRoute);


app.set("view engine", "ejs");

mongoose.set("strictQuery", false);
mongoose.connect(
  process.env.mongoDBURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    
    console.log("MongoDB Connected Successfully");
  

  },
  
);




app.listen(port, () => {
  console.log(`football app on port ${port}`);
});

