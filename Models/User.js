const mongoose = require("mongoose");

const User = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    done: { type: Boolean, default: false },
    didStart: { type: Boolean, default: false },
    startTime: { type: Date },
    answers: [],
    info: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      gender: { type: String, default: "female" },
      birthdate: { type: String },
      cin: { type: Number },
      phone: { type: Number, min: 10000000, max: 99999999, required: true },
      governorate: { type: String },
      city: { type: String },
      address: { type: String }
    },
    education: {
      bacYear: { type: Number },
      bacMajor: { type: String },
      bacAvg: { type: Number },
      degree: {
        type: String,
        enum: ["Licence", "Master", "Ing"],
        default: "Licence"	
      },
      degreeFile: { type: String },
      uni: { type: String },
      major: { type: String }
    },
    assos: {
      board: { type: Boolean, default: false },
      member: { type: Boolean, default: false },
      organization: { type: String }
    },
    background: {
      notions: { type: String },
      projets: { type: String },
      stages: { type: String },
      projetFier: { type: String },
      motivation: { type: String },
      reussir: { type: String },
      notionsToggle: { type: Boolean, default: false },
      projetToggle: { type: Boolean, default: false },
      stageToggle: { type: Boolean, default: false }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", User);
