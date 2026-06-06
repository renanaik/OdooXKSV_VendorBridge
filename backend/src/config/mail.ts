import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '2525'),
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendEmail = async (options: { email: string; subject: string; message: string; attachments?: any[] }) => {
  const message = {
    from: `${process.env.FROM_NAME || 'VendorBridge'} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.message.replace(/\n/g, '<br>'), // Basic HTML conversion
    attachments: options.attachments,
  };

  try {
    const info = await transporter.sendMail(message);
    console.log('Email sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Email sending failed:', error);
    // Don't throw for now to avoid crashing operations if SMTP isn't fully configured
    return null;
  }
};
