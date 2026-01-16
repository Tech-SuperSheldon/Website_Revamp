const nodemailer = require("nodemailer");

// Create reusable transporter
const createTransporter = () => {
  const config = {
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS || process.env.EMAIL_PASSWORD, // Support both variable names
    },
  };

  // If custom SMTP settings are provided, use them
  if (process.env.EMAIL_HOST && process.env.EMAIL_PORT) {
    config.host = process.env.EMAIL_HOST;
    config.port = parseInt(process.env.EMAIL_PORT);
    config.secure = parseInt(process.env.EMAIL_PORT) === 465; // true for 465, false for other ports
  } else if (process.env.EMAIL_SERVICE) {
    config.service = process.env.EMAIL_SERVICE;
  }

  return nodemailer.createTransport(config);
};

/**
 * Send an email
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} html - Email HTML content
 * @returns {Promise<{ok: boolean, message?: string, error?: string}>}
 */
const sendEmail = async (to, subject, html) => {
  try {
    // Validate inputs
    if (!to || !subject || !html) {
      return {
        ok: false,
        error: "Missing required parameters: to, subject, or html",
      };
    }

    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || (!process.env.EMAIL_PASS && !process.env.EMAIL_PASSWORD)) {
      console.warn("Email credentials not configured in .env file");
      return {
        ok: false,
        error: "Email service not configured",
      };
    }

    const transporter = createTransporter();

    const mailOptions = {
      from: `"Super Sheldon" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      html: html,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent successfully:", info.messageId);
    return {
      ok: true,
      message: "Email sent successfully",
      messageId: info.messageId,
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      ok: false,
      error: error.message || "Failed to send email",
    };
  }
};

module.exports = sendEmail;

