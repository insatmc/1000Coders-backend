const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const VerifyToken = require("../Helpers/VerifyToken");
require("dotenv").config();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const User = require("../Models/User");

const generatePassword = require("../Helpers/RandomPassword");
const sendMail = require("../Helpers/MailGun");
const { welcomeMail } = require("../Helpers/EmailTemplates");

const jwt = require("jsonwebtoken"); // used to create, sign, and verify tokens
const bcrypt = require("bcrypt");

router.post("/authorize", function(req, res) {
  User.findOne({ email: req.body.email }, function(err, user) {
    if (err) return res.status(500).send("Error on the server.");
    if (!user) return res.status(404).send("No user found.");

    // check if the password is valid
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid)
      return res.status(401).send({ auth: false, token: null });

    // if user is found and password is valid
    // create a token
    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: 86400 // expires in 24 hours
    });

    // return the information including token as JSON
    res
      .status(200)
      .send({ auth: true, token: token, id: user._id, email: user.email });
  });
});

router.get("/logout", function(req, res) {
  res.status(200).send({ auth: false, token: null });
});

router.post("/register", function(req, res) {
  // const password = generatePassword(15);
  const password = "root";
  const hashedPassword = bcrypt.hashSync(password, 8);

  User.create(
    {
      _id: new mongoose.Types.ObjectId(),
      email: req.body.email,
      password: hashedPassword,
      info: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
      }
    },
    function(err, user) {
      if (err)
        return res
          .status(400)
          .send("There was a problem registering the user`." + err);

      // if user is registered without errors
      // create a token
      const token = jwt.sign({ id: user._id }, process.env.SECRET, {
        expiresIn: 86400 // expires in 24 hours
      });

      sendMail(welcomeMail, req.body.email, password);
      res.status(200).send({ auth: true, token: token, id: user._id, email: user.email });
    }
  );
});

router.get("/me", VerifyToken, function(req, res, next) {
  User.findById(req.userId, { password: 0 }, function(err, user) {
    if (err)
      return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");
    res.status(200).send(user);
  });
});

module.exports = router;
