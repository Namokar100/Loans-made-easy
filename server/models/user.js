const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userType: { 
    type: String, 
    enum: ['personal', 'business'], 
    required: true 
  },
  // Personal User Fields
  name: { 
    type: String, 
    required: function() { return this.userType === 'personal'; } 
  },
  aadhaar: { 
    type: String, 
    required: function() { return this.userType === 'personal'; }, 
    unique: true, 
    sparse: true // Allows multiple null values, enforces uniqueness only for non-null values
  },
  pan: { 
    type: String, 
    required: function() { return this.userType === 'personal'; }, 
    unique: true, 
    sparse: true 
  },

  // Business User Fields
  buzName: { 
    type: String, 
    required: function() { return this.userType === 'business'; } 
  },
  buzIndustry: { 
    type: String, 
    enum: [
      'Manufacturing', 'Retail', 'Wholesale', 'Service', 'Technology', 
      'Financial Services', 'Construction', 'Transportation', 'Real Estate', 
      'Healthcare', 'Education', 'Entertainment', 'Agriculture', 'Food and Beverage', 
      'Telecommunications', 'Energy', 'Consulting', 'Non-Profit', 'Media', 
      'Logistics', 'Art and Crafts', 'Automotive', 'Tourism', 'E-Commerce', 'Other'
    ], 
    required: function() { return this.userType === 'business'; }
  },

  // Common Fields
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  contact: { 
    type: String, 
    required: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  otp: { 
    type: String, 
    required: true 
  },
  otpExpiry: { 
    type: Date, 
    required: true 
  },
  isVerified: { 
    type: Boolean, 
    default: false 
  },
});

// Drop the existing indexes on `aadhaar` and `pan` if they exist
UserSchema.index({ aadhaar: 1 }, { unique: true, sparse: true });
UserSchema.index({ pan: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model("User", UserSchema);
