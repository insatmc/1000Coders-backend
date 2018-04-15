const mongoose = require("mongoose");

const Questions = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  content: { type: String, required: true },
  choices: []
});

module.exports = mongoose.model("Questions", Questions);
