import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();
app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",  // Brevo SMTP host
    port: 587,                      // TLS: 587, SSL: 465
    secure: false,                  // true for 465, false for 587
    auth: {
        user: process.env.BREVO_EMAIL,
        pass: process.env.BREVO_SMTP_KEY
    },
    // logger: true,
    // debugger:true
});

// API to send email
app.post("/send-email", async (req, res) => {
    const { name, email, phone,address, selectedPlan, appointmentDate, appointmentTime } = req.body;

    if (!email || !selectedPlan) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    try {
        // Email to Pathocare & Admin
        await transporter.sendMail({
            from: `"Scientific Pathocare" <sampractice3210@gmail.com>}>`,
            to: "sampractice3210@gmail.com", // Send to both emails
            subject: "New Appointment Booking",
            text: `New appointment booking:
            Name: ${name}
            Email: ${email}
            Phone: ${phone}
            Address: ${address}
            Test: ${selectedPlan?.name}
            Date: ${appointmentDate}
            Time: ${appointmentTime}`
        });

        // Confirmation Email to User
        await transporter.sendMail({
            from: `"Scientific Pathocare" <${process.env.BREVO_EMAIL}>`,
            to: email, // User's email
            subject: "Appointment Confirmation",
            text: `Your appointment has been confirmed!
            Test: ${selectedPlan?.name}
            Date: ${appointmentDate}
            Time: ${appointmentTime}`
        });

        res.json({ success: true, message: "Emails sent successfully!" });
    } catch (error) {
        console.error("Email sending error:", error);
        res.status(500).json({ success: false, message: "Failed to send email" });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
