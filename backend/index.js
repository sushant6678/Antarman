import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import jwt from "jsonwebtoken";

import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import doctorRoute from "./routes/doctor.js";
import reviewRoute from "./routes/review.js";
import bookingRoute from "./routes/booking.js";

import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: true,
};

app.get("/", (req, res) => {
  res.send("hello server");
});

// database connection
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB database connected");
  } catch (err) {
    console.log("MongoDB database connection failed");
  }
};

// middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/doctors", doctorRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use("/api/v1/bookings", bookingRoute);

// Create a nodemailer transporter (use your email service's SMTP settings)
const transporter = nodemailer.createTransport({
  service: "Gmail", // e.g., Gmail
  auth: {
    user: "antarmanproject@gmail.com",
    pass: "zedp pylr zqce nfbd",
  },
});

// Route to send a verification email
app.post("/api/v1/send-verification-email", async (req, res) => {
  try {
    const { email } = req.body;
    // res.send(JSON.stringify(email));

    // Generate a verification token (adjust secret and expiration as needed)
    const verificationToken = jwt.sign({ email }, "your-secret-key", {
      expiresIn: "24h", // Set token expiration (adjust as needed)
    });

    console.log(verificationToken);

    const URL = "http://localhost:3000"

    // Compose the email message
    const mailOptions = {
      from: "antarmanproject@gmail.com",
      to: email,
      subject: "Email Verification",
      // html: `Click <a href="${URL}/verify-email/${verificationToken}">here</a> to verify your email.`,
      html: `Click <a href="${URL}/verify-email?token=${verificationToken}">here</a> to verify your email.`,
    };

    // Send the verification email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

import User from "./models/UserSchema.js";

// Route to handle email verification
app.get("/verify-email", async (req, res) => {
  try {
    const { token } = req.query;

    // Verify the token
    const decodedToken = jwt.verify(token, "your-secret-key");

    // Find the user by email from the token payload
    const user = await User.findOne({ email: decodedToken.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the email is already verified
    if (user.emailStatus === "verified") {
      return res.status(200).json({ message: "Email is already verified" });
    }

    // Update the user's email status to "verified"
    user.emailStatus = "verified";
    await user.save();

    // Return a success message
    return res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred" });
  }
});


app.get('/hi', async (req, res) => {
  try {
    const { token } = req.query;
    console.log(token)

    // Verify the token
    const decodedToken = jwt.verify(token, "your-secret-key");

    // Find the user by email from the token payload
    const user = await User.findOne({ email: decodedToken.email });
    console.log(user)

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the email is already verified
    if (user.emailStatus === "verified") {
      return res.status(200).json({ message: "Email verified successfully" });
    }

    // Update the user's email status to "verified"
    user.emailStatus = "verified";
    user.isApproved = "approved";
    await user.save();

    // Return a success message
    return res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred" });
  }
})

app.listen(port, () => {
  connectDB();
  console.log("server listening on port" + port);
});
