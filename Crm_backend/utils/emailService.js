const nodemailer = require('nodemailer');
require('dotenv').config();  // Make sure you're loading env variables

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,  // Use email from env
    pass: process.env.EMAIL_PASS,  // Use app password from env
  },
});

module.exports = async function sendEmail({ email, subject, message }) {
  const mailOptions = {
    from: process.env.EMAIL_USER,   // Use email from env
    to: email,
    subject: subject,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
