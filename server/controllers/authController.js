const User = require("../models/user"); // Replace with the correct path to your User model
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: "Gmail", // Use your email service provider
  auth: {
    user: process.env.EMAIL, // Your email
    pass: process.env.EMAIL_PASSWORD, // Your email password
  },
});

// Generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Signup Controller
exports.signup = async (req, res) => {
  try {
    const { userType } = req.body;
    if (userType === "personal") {
      try {
        const { email, password, userType, name, aadhaar, pan, buzName, buzIndustry, contact } = req.body;
    
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: "User already exists" });
        }
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Generate OTP and expiry
        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
    
        // Create user
        const user = new User({
          userType,
          name,
          aadhaar,
          pan,
          buzName,
          buzIndustry,
          email,
          contact,
          password: hashedPassword,
          otp,
          otpExpiry,
          isVerified: false,
        });
    
        await user.save();
    
        // Send OTP via email
        await transporter.sendMail({
          from: process.env.EMAIL,
          to: email,
          subject: "Your OTP for Signup",
          text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
        });
    
        res.status(201).json({ message: "Signup successful, OTP sent to email." });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error." });
      }
    }
    else{
      try {
        const { email, password, userType, buzName, buzIndustry, contact } = req.body;
    
        // Validate the userType
        if (userType !== "business") {
          return res.status(400).json({ message: "Invalid user type for business signup." });
        }
    
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: "User already exists." });
        }
    
        // Validate enum value for buzIndustry
        const validIndustries = [
          "Manufacturing", "Retail", "Wholesale", "Service", "Technology", 
          "Financial Services", "Construction", "Transportation", "Real Estate", 
          "Healthcare", "Education", "Entertainment", "Agriculture", "Food and Beverage", 
          "Telecommunications", "Energy", "Consulting", "Non-Profit", "Media", 
          "Logistics", "Art and Crafts", "Automotive", "Tourism", "E-Commerce", "Other"
        ];
        if (!validIndustries.includes(buzIndustry)) {
          return res.status(400).json({ message: "Invalid industry type." });
        }
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Generate OTP and expiry
        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
    
        // Create the user
        const user = new User({
          userType,
          buzName,
          buzIndustry,
          contact,
          email,
          password: hashedPassword,
          otp,
          otpExpiry,
          isVerified: false,
        });
    
        await user.save();
    
        // Send OTP via email
        await transporter.sendMail({
          from: process.env.EMAIL,
          to: email,
          subject: "Your OTP for Signup",
          text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
        });
    
        res.status(201).json({ message: "Business signup successful. OTP sent to email." });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error." });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }

};

// Verify OTP Controller
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ error: "Invalid OTP." });
    }

    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({ error: "OTP has expired." });
    }

    await User.findOneAndUpdate(
      { email },
      { $set: { isVerified: true, otp: null, otpExpiry: null } },
      { new: true }
    );

    res.status(200).json({ message: "Email verified successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred during verification." });
  }
};

// Resend OTP Controller
exports.resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Your OTP for Signup",
      text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
    });

    res.status(200).json({ message: "OTP resent successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// Login Controller
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    if (!user.isVerified) {
      return res.status(400).json({ error: "Email is not verified. Please verify your email first." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful.",
      token,
      userType: user.userType,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred during login." });
  }
};
