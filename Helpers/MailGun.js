const Mailgun = require("mailgun-js");
const { welcomeMail } = require("./EmailTemplates");
require("dotenv").config();

const mailgun = new Mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN
});

module.exports = sendMail = (template, email, password) => {
  const data = {
    from: process.env.MAILGUN_SENDER_MAIL,
    to: "aymen.chebi@gmail.com",
    subject: template(password).subject,
    html: template(password).body
  };

  mailgun.messages().send(data, (err, body) => {
    if (err) console.log(err);
    else console.log("Mailgun : " + body.message);
  });
};
