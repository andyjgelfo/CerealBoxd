require("dotenv").config();
const sgMail = require("@sendgrid/mail");

const sendEmail = (to, from, subject, text) => {
  const msg = {
    to: to,
    from: from,
    subject: subject,
    text: text
  };

  sgMail.send(msg, function (err, result) {
    if (err) {
        
      console.log("email faileed")
      console.log(err);
    } else {
      console.log("Email was Sent");
    }
  });
};

module.exports = sendEmail;