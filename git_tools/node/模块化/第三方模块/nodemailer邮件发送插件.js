"use strict";
const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "smtp.qq.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "1505497906@qq.com", // generated ethereal user
    pass: "mbwtqfqrngedbaae" // generated ethereal password
  }
});

transporter.sendMail({
  from: '"Fred Foo 👻" <1505497906@qq.com>', // sender address
  to: "1505497906@qq.com", // list of receivers
  subject: "Hello ✔小魏同学", // Subject line
  text:
    "你好啊，小魏同学，我是魏玮璇，我给你发邮件啦，你的邮件密码是123456，5分钟有效！！！" // plain text body
  // html: "<b>Hello world?</b>" // html body
});
