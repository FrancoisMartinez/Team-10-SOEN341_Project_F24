const express = require('express');
const router = express.Router();
const { sendMail } = require('../email/mailer');

router.post('/email', async (req, res) => {
  const { email, subject, message } = req.body;
  try {
    if (!email || !subject || !message) {
        return res.status(400).send({ success: false, message: 'Missing required fields' });
      }
    await sendMail(email, subject, message);
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to send email', error });
  }
});

module.exports = router;
