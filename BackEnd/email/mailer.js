// mailer.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail', // e.g., 'Gmail', 'Outlook'
  auth: {
    user: 'team10peerreview@gmail.com',
    pass: 'S<S8g(dI'
  }
});

function sendMail(to, subject, text) {
  const mailOptions = {
    from: 'team10peerreview@gmail.com',
    to,
    subject,
    text
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { sendMail };
