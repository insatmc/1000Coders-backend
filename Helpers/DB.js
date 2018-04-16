const mongoose = require("mongoose");
require("dotenv").config();

const mongoUri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${
  process.env.DB_HOST
}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

(async () => {
  try {
    await mongoose.connect(mongoUri);
  } catch (err) {
    console.log(err);
  }
})();
