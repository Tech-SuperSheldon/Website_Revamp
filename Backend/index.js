const express = require("express") ;
const app = express() ;
require("dotenv").config() ;

const {connect} = require("./src/config/db") ;
const cors = require("cors") ;
const userRouter = require("./src/routes/userRouter") ;
const superSheldonFormRouter = require("./src/routes/superSheldonFormRouter") ;

// Mongoose model for storing form submissions
const SendEmailModel = require("./src/model/sendEmail");
// Email service
const sendEmail = require("./src/utils/emailService");

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Helper function to escape HTML
const escapeHtml = (str) => {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

// Constants for URLs (you can move these to .env if needed)
const DOWNLOAD_GUIDE_URL = process.env.DOWNLOAD_GUIDE_URL || "https://supersheldon.com/guide";
const DEMO_URL = process.env.DEMO_URL || "https://supersheldon.com/demo";
const allowlist = new Set([
  "http://localhost:3000",
  "http://localhost:3003",
  "https://www.supersheldon.com",
  "https://supersheldon.com"
]);

const corsOptions = {
  origin(origin, cb) {
    if (!origin || allowlist.has(origin)) return cb(null, true);
    return cb(null, false);
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

app.use(cors(corsOptions));

app.use(express.json()) ;

// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK", message: "Server is running" });
});

// Book Demo 
app.use("/user" , userRouter) ;

// --------- Guide Download Endpoint ----------
app.post("/api/download-guide", async (req, res) => {
  try {
    const { email } = req.body || {};

    if (!email) {
      return res
        .status(400)
        .json({ ok: false, message: "Email is required." });
    }

    const normalizedEmail = String(email || "").trim().toLowerCase();

    if (!emailRegex.test(normalizedEmail)) {
      return res
        .status(400)
        .json({ ok: false, message: "Please provide a valid email." });
    }

    // Send guide email
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #f97316;">Hi there,</h2>
        
        <p>Thank you for showing interest in a 1:1 guidance session with Super Sheldon.</p>
        
        <p>Our team has received your request and will connect with you shortly to coordinate and book the demo at your convenient time.</p>
        
        <p>Thank you for your time and interest.<br/>
        We look forward to speaking with you soon.</p>
        
        <p style="margin-top: 30px;">
          Warm regards,<br/>
          <strong>Team Super Sheldon</strong>
        </p>
      </div>
    `;

    const emailResult = await sendEmail(
      normalizedEmail,
      "Thanks for Booking a 1:1 Session with Super Sheldon",
      html
    );

    if (!emailResult?.ok) {
      return res.status(500).json({
        ok: false,
        message: "Failed to send email. Please try again later.",
      });
    }

    return res.json({
      ok: true,
      message: "Guide sent successfully! Check your inbox.",
    });
  } catch (err) {
    console.error("download-guide error:", err);
    return res.status(500).json({
      ok: false,
      message: "Unexpected error. Please try again later.",
    });
  }
});

// --------- SuperSheldon form submission ----------
app.post("/api/super-sheldon-form/submit", async (req, res) => {
  try {
    const { fullName, email, mobile, childAgeYear, subject } = req.body || {};

    if (![fullName, email, mobile, childAgeYear, subject].every(Boolean)) {
      return res
        .status(400)
        .json({ ok: false, message: "All fields are required." });
    }

    const normalized = {
      fullName: String(fullName || "").trim(),
      email: String(email || "").trim().toLowerCase(),
      mobile: String(mobile || "").trim(),
      childAgeYear: String(childAgeYear || "").trim(),
      subject: String(subject || "").trim(),
    };

    if (!emailRegex.test(normalized.email)) {
      return res
        .status(400)
        .json({ ok: false, message: "Please provide a valid email." });
    }

    // Save submission to database
    await SendEmailModel.create(normalized);

    // Send demo booking confirmation email
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #f97316;">Hi ${escapeHtml(normalized.fullName)},</h2>
        
        <p style="font-size: 16px; line-height: 1.6; color: #334155;">
          Thank you for showing interest in a 1:1 guidance session with Super Sheldon.
        </p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #334155;">
          Our team has received your request and will connect with you shortly to coordinate and book the demo at your convenient time.
        </p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #334155;">
          Thank you for your time and interest.<br/>
          We look forward to speaking with you soon.
        </p>
        
        <p style="margin-top: 30px; font-size: 16px; line-height: 1.6; color: #334155;">
          Warm regards,<br/>
          <strong style="color: #f97316;">Team Super Sheldon</strong>
        </p>
      </div>
    `;

    const emailResult = await sendEmail(
      normalized.email,
      "Thanks for Booking a 1:1 Session with Super Sheldon",
      html
    );

    if (!emailResult?.ok) {
      console.warn("Email send failed but form was saved:", emailResult?.error);
      // Don't fail the request if email fails - form is already saved
    }

    return res.json({
      ok: true,
      message: "Form submitted successfully.",
    });
  } catch (err) {
    console.error("super-sheldon-form submit error:", err);
    return res.status(500).json({
      ok: false,
      message: "Unexpected error. Please try again later.",
    });
  }
});
// Super Sheldon Form
app.use("/api/super-sheldon-form", superSheldonFormRouter) ;

// parallely calling two function to connent DB and redis both at the same time
const initializeConnection = async ()=>{

    try{
        await connect() ;
        console.log("DB Connected") ;
        const PORT = process.env.PORT;
        app.listen(PORT, () => {
            console.log(`Server listening at http://localhost:${PORT}`);
        });
    }
    catch(err)
    {
        console.log("Error : " + err) ;
    }
}

initializeConnection() ;
