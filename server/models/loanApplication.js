// models/LoanApplication.js
const mongoose = require("mongoose");

const LoanApplicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  address: {
    addressLine: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
  },
  currentAccountBank: { 
    type: String, 
    enum: ['Canara', 'Other Bank'], 
    required: true 
  },
  accountNo: { type: String, required: true },
  ifsc: { type: String, required: true },
  bankStatementFile: { type: String },  // URL of the bank statement file uploaded to Cloudinary
  otherTransactionFile: { type: String },  // URL of other transaction details file uploaded to Cloudinary
  formDetailsFile: { type: String },  // URL of the form details file uploaded to Cloudinary
  businessGoogleMapLink: { type: String },  // Optional, can be null
}, {
  timestamps: true,  // Added to track created and updated times
});

module.exports = mongoose.model("LoanApplication", LoanApplicationSchema);
