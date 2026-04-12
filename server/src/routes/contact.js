import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

// Email transporter factory so it loads env variables at runtime
const getTransporter = () => nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // e.g. janeshkrishna12@gmail.com
    pass: process.env.EMAIL_PASS, // e.g. App Password for Gmail
  },
});

router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Name, email and message are required fields' });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'janeshkrishna12@gmail.com',
    replyTo: email,
    subject: `Portfolio Contact: ${subject || 'New Message from ' + name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    html: `
      <h3>New message from your portfolio</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
      <p><strong>Message:</strong></p>
      <blockquote style="border-left: 4px solid #FFE500; padding-left: 10px; margin-left: 0;">
        ${message.replace(/\n/g, '<br/>')}
      </blockquote>
    `,
  };

  try {
    // Only attempt to send if credentials are provided in .env
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn('⚠️ EMAIL_USER or EMAIL_PASS not configured in .env. Skipping actual email delivery.');
      return res.status(200).json({ success: true, message: 'Message logged (email not configured in backend)' });
    }

    const transporter = getTransporter();
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send message' });
  }
});

export default router;
