// require("dotenv").config();
// // const sgMail = require("@sendgrid/mail");
// // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// var nodemailer = require('nodemailer');

// const sendEmail = (to, from, subject, text) => {
//   const msg = {
//     to: to,
//     from: from,
//     subject: subject,
//     text: text
//   };

// //   sgMail.send(msg, function (err, result) {
// //     if (err) {
        
// //       console.log("email faileed")
// //       console.log(err);
// //     } else {
// //       console.log("Email was Sent");
// //     }
// //   });

// // create reusable transporter object using the default SMTP transport
// transport = nodemailer.createTransport({
//   host: "smtp.ethereal.email",
//   port: 587,
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: testAccount.user, // generated ethereal user
//     pass: testAccount.pass, // generated ethereal password
//   },
// });
// };

// module.exports = sendEmail;