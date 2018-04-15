const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const moment = require("moment");

const VerifyToken = require("../Helpers/VerifyToken");

router.use(bodyParser.urlencoded({ extended: true }));
const User = require("../Models/User");

router.get("/:id", function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err)
      return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");
    res.status(200).send(user);
  }).select("-password");
});

router.put("/:id", VerifyToken, function(req, res) {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(
    err,
    user
  ) {
    if (err)
      return res
        .status(500)
        .send("There was a problem updating the user." + err);
    res.status(200).send(user);
  });
});

router.get("/start/:id", VerifyToken, (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) console.log(err);
    if (user.done)
      return res.status(200).send({ canStart: false, results: user.answers });
    if (user.didStart) {
      const startTime = moment(user.startTime);
      const now = moment();
      const remaining = 1500000 - now.diff(startTime, "miliseconds");
      if (now.diff(startTime, "minutes") < 25) {
        res.status(200).send({
          canStart: true,
          remaining
        });
      } else {
        res.status(200).send({
          canStart: false
        });
      }
    } else {
      User.findByIdAndUpdate(
        req.params.id,
        {
          didStart: true,
          startTime: Date.now()
        },
        (err, user) => {
          if (err) console.log(err);
          res.status(200).send({
            canStart: true,
            remaining: 1500000
          });
        }
      );
    }
  });
});

enumurateCorrectAnswers = questions => {
  return questions
    .map((question, i) =>
      question.choices.filter(
        (choice, x) =>
          choice.isCorrect === choice.isSelected && choice.isSelected
      )
    )
    .filter((answer, i) => answer.length !== 0);
};

router.post("/submit", VerifyToken, (req, res) => {
  User.findById(req.body.id, (err, user) => {
    if (err) console.log(err);
    if (user.done) {
      res.status(200).send({ results: user.answers });
    } else {
      User.findByIdAndUpdate(
        req.body.id,
        {
          done: true,
          answers: req.body.questions
            .map((question, i) =>
              question.choices.filter(
                (choice, x) =>
                  choice.isCorrect === choice.isSelected && choice.isSelected
              )
            )
            .filter((answer, i) => answer.length !== 0)
        },
        (err, user) => {
          if (err) console.log(err);
          res.status(200).send({ results: user.answers });
        }
      );
    }
  });
});

module.exports = router;
