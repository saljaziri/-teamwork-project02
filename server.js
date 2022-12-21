const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

path = require('path');
fs = require('fs');
const port = process.env.PORT;
const app = express();
global.__basedir = __dirname;

global.__imagedir = "";

app.use(express.static("public"));
//app.get("/", express.static(path.join(__dirname, "./public")));

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
const ClubRoute = require('./routes/clubs');
const UserProfile = require("./models/UserProfile");
app.use("/", indexRoute);
app.use("/", playerRoute);
app.use("/", authRoute);
app.use("/", userProfileRoute);
app.use('/', dreamClubRoute);
app.use('/', ClubRoute);


app.set("view engine", "ejs");

mongoose.set("strictQuery", false);
mongoose.connect(
  process.env.mongoDBURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    
    console.log("MongoDB Connected Successfully");
  

  },
  
);

// mongoose.connection.once("open", () => {
//   const roleJson = require("./data/role.json");
// const countryJson = require("./data/country.json");
// const Role = require("./models/Role");
// const Country = require("./models/Country");
//   Role.insertMany(roleJson, (err, result) => {
//     if (err) {
//     } else {
//     }
//   });

//   Country.insertMany(countryJson, (err, result) => {
//     if (err) {
//     } else {
//     }
//   });
// });



app.listen(port, () => {
  console.log(`football app on port ${port}`);
});

