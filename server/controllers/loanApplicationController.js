const LoanApplication = require("../models/loanApplication");
const User = require("../models/user"); // Assuming User model exists
const cloudinary = require("cloudinary").v2;

// Utility: Upload file to Cloudinary
const uploadFileToCloud = async (filePath, folder) => {
  const options = { folder, resource_type: "auto" };
  return await cloudinary.uploader.upload(filePath, options);
};

exports.createLoanApplication = async (req, res) => {
  try {
    const {
      userId,
      addressLine,
      city,
      state,
      pincode,
      currentAccountBank,
      accountNo,
      ifsc,
      businessGoogleMapLink,
    } = req.body;

    // Validate user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Validate files
    if (!req.files || !req.files.bankStatementFile || !req.files.otherTransactionFile) {
      return res.status(400).json({ success: false, message: "Files are required" });
    }

    // Upload files
    const uploadedBankStatement = await uploadFileToCloud(
      req.files.bankStatementFile[0].path,
      "loan_applications/bank_statements"
    );
    const uploadedOtherTransaction = await uploadFileToCloud(
      req.files.otherTransactionFile[0].path,
      "loan_applications/transactions"
    );

    // Generate form details
    const formDetailsContent = `
      Name: ${user.name}
      Contact: ${user.contactNo}
      Email: ${user.email}
      Address: ${addressLine}, ${city}, ${state}, ${pincode}
      Current Account Bank: ${currentAccountBank}
      Account No: ${accountNo}
      IFSC: ${ifsc}
      Google Maps Link: ${businessGoogleMapLink || "N/A"}
    `;
    const formDetailsUpload = await cloudinary.uploader.upload(
      `data:text/plain;base64,${Buffer.from(formDetailsContent).toString("base64")}`,
      { folder: "loan_applications/form_details", resource_type: "raw" }
    );

    // Create loan application
    const loanApplication = await LoanApplication.create({
      userId,
      address: { addressLine, city, state, pincode },
      currentAccountBank,
      accountNo,
      ifsc,
      bankStatementFile: uploadedBankStatement.secure_url,
      otherTransactionFile: uploadedOtherTransaction.secure_url,
      formDetailsFile: formDetailsUpload.secure_url,
      businessGoogleMapLink,
    });

    res.status(201).json({
      success: true,
      message: "Loan application created successfully",
      data: loanApplication,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
