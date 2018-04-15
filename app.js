const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors')


const User = require("./Controllers/UserController");
const Auth = require("./Controllers/AuthController");
const Questions = require("./Controllers/QuestionsController");

require("./Helpers/DB");
require("dotenv").config();

const app = express();
const PORT = process.env.SERVER_PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.use("/api/user", User);
app.use("/api/questions", Questions);
app.use("/api", Auth);

app.listen(PORT, () => console.log(`Started server: http://localhost:${PORT}`));
