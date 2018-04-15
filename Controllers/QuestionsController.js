const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const VerifyToken = require("../Helpers/VerifyToken");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const Question = require("../Models/Question");
const Examples = require("../Models/Examples");

router.get("/", VerifyToken, function(req, res) {
  Question.find({}, function(err, questions) {
    if (err)
      return res.status(500).send("There was a problem finding the questions.");
    res.status(200).send(questions);
  });
});

router.get("/examples", VerifyToken, function(req, res) {
  Examples.find({}, function(err, examples) {
    if (err)
      return res.status(500).send("There was a problem finding the examples.");
    res.status(200).send(examples);
  });
});

module.exports = router;