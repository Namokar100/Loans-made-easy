const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Hardcoded bank credentials (Canara Bank)
const BANK_CREDENTIALS = {
  email: "canarabank@canara.bank",
  password: "codemonks",
};

// Sign In Controller for Bank
exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Bank login attempt received.");
    console.log("Email:", email);

    // Check if the provided email matches Canara Bank's email
    if (email !== BANK_CREDENTIALS.email) {
      console.log("Invalid bank email provided.");
      return res.status(400).json({ message: "Invalid email." });
    }

    // Check if the password matches
    const isPasswordValid = email === BANK_CREDENTIALS.email && password === BANK_CREDENTIALS.password;
    if (!isPasswordValid) {
      console.log("Invalid bank password provided.");
      return res.status(400).json({ message: "Invalid password." });
    }

    console.log("Bank authentication successful.");

    // Create JWT token (for further authentication/authorization)
    const token = jwt.sign(
      { email: BANK_CREDENTIALS.email },
      process.env.JWT_SECRET, // Use a secure secret for JWT
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    console.log("JWT token created:", token);

    // Send token back to the bank
    res.status(200).json({
      message: "Login successful.",
      token: token,
    });
  } catch (error) {
    console.error("Error during bank login:", error);
    res.status(500).json({ message: "Server error." });
  }
};
