import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Validate environment variables
if (
  !process.env.EMAIL_USER ||
  !process.env.EMAIL_PASS ||
  !process.env.EMAIL_TO
) {
  console.error("Missing required environment variables");
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // SSL
  auth: {
    user: "yrsoftwaredeveloper@gmail.com",
    pass: "yqcq lfyk udjv sjqz",
  },
});

// Verify transporter connection
transporter.verify((error) => {
  if (error) {
    console.error("Error with transporter:", error);
  } else {
    console.log("Server is ready to send emails");
  }
});

app.post("/api/send-email", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }

    const mailOptions = {
      from: `"Contact Form" <${"yrsoftwaredeveloper@gmail.com"}>`,
      to: "yrsoftwaredeveloper@gmail.com", // Make sure this is set in your .env
      subject: `New Contact: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        Message: ${message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, error: "Failed to send email" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
