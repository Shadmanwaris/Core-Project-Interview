var nodemailer = require("nodemailer");
var smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "isacmiller90@gmail.com",
    pass: "handsome1991"
  }
});

exports.smtpTransport = smtpTransport