const mongoose = require("mongoose");

const Examples = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  content: { type: String, required: true },
  choices: []
});

module.exports = mongoose.model("Examples", Examples);

// {
// 	content: { type: Boolean },
// 	isCorrect: { type: Boolean }
// }
