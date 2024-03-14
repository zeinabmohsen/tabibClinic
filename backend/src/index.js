require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");

const passportSetup = require("../passport");

const routes = require("./api/routes/v1/index");

const session = require("express-session");
const mongoose = require("./config/mongoose");
const app = express();
app.use(express.json());

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: false,
    },
  })
);
mongoose.connect();

app.use(passport.initialize());

app.use(
  cors({
    origin: function (origin, callback) {
      callback(null, true);
    },
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  })
);

app.use("/v1", routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
