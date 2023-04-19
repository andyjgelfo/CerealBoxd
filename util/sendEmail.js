require("dotenv").config();
const nodemailer = require("nodemailer");

const sendEmail = (to, subject, text) => {
  const msg = {
    name: "CerealBoxd",
    from: process.env.EMAIL,
    to: to,
    subject: subject,
    html: "<div><p>" + text + "</p></div>"
  };


    const transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: '465',
        secure:true,
        auth : {
            user: process.env.EMAIL,
            pass: process.env.EP
        }
    })
    transporter.sendMail(msg, (error, info) =>{
        if(error) console.log(error)
        else console.log(info)
    })


};

module.exports = sendEmail;