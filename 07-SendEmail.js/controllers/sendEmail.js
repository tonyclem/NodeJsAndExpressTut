// const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");

// const sendEmailEthereal = async (req, res) => {
//   let testAccount = await nodemailer.createTestAccount();

//   const transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false,
//     auth: {
//       user: "y3xibbp7cfgjgja4@ethereal.email",
//       pass: "Y67yXUAbTpHkUy8F2K",
//     },
//   });

//   let info = await transporter.sendMail({
//     from: '"Clement Anthony" <amohamclez@gmail.com>',
//     to: "bar@example.com",
//     subject: "Hello ✔",
//     html: "<h1>Hello world?</h1>",
//   });

//   //   res.json(info);
// };

const sendEmail = async (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: "amohamclez@gmail.com", // Change to your recipient
    from: "clementa143@gmail.com", // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };

  const info = await sgMail.send(msg);
  res.json(info);
};

module.exports = sendEmail;
