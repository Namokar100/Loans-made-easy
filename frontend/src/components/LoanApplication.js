import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function LoanApplication() {
  const [formData, setFormData] = useState({
    name: "", // This will be pre-filled
    addressLine: "", // Address Line 1
    city: "", // City
    state: "", // State
    pincode: "", // Pincode
    bankType: "other", // Bank Type (Canara or other)
    accountNumber: "", // Account Number
    ifscCode: "", // IFSC Code
    googleLink: "", // Business Google Map Link
    bankStatement: null, // Bank Statement File
    otherTransactionFile: null, // Other Transaction File
  });

  const [isDocumentUploaded, setIsDocumentUploaded] = useState(false);
  const navigate = useNavigate(); // Use navigate to redirect after submit

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file uploads
  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      [fileType]: file,
    }));
    setIsDocumentUploaded(true);
  };

  const handleBankSelection = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      bankType: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Loan Application Data: ", formData);

    // After submission, navigate to next page
    navigate("/sentimentQuizPage"); // Redirect to sentiment quiz page (you can change the path as needed)
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Loan Application Form</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Pre-filled name */}
        <div>
          <label className="block">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300"
            disabled
          />
        </div>

        {/* Address fields */}
        <div>
          <label className="block">Address Line 1</label>
          <input
            type="text"
            name="addressLine"
            value={formData.addressLine}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300"
            required
          />
        </div>

        <div>
          <label className="block">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300"
            required
          />
        </div>

        <div>
          <label className="block">State</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300"
            required
          />
        </div>

        <div>
          <label className="block">Pincode</label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300"
            required
          />
        </div>

        {/* Bank type selection */}
        <div>
          <label className="block">Current Bank Type</label>
          <select
            name="bankType"
            value={formData.bankType}
            onChange={handleBankSelection}
            className="w-full p-2 border border-gray-300"
          >
            <option value="other">Other Banks</option>
            <option value="canara">Canara Bank</option>
          </select>
        </div>

        {/* For both Canara and Other Banks - Account Number and IFSC Code */}
        <div>
          <label className="block">Account Number</label>
          <input
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300"
            required
          />
        </div>

        <div>
          <label className="block">IFSC Code</label>
          <input
            type="text"
            name="ifscCode"
            value={formData.ifscCode}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300"
            required
          />
        </div>

        {/* Upload Google Business Map Link (Above file upload fields) */}
        <div>
          <label className="block">Google Business Map Link</label>
          <input
            type="url"
            name="googleLink"
            value={formData.googleLink}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300"
            required
          />
        </div>

        {/* Upload Bank Statement File */}
        <div>
          <label className="block">Bank Statement File</label>
          <input
            type="file"
            onChange={(e) => handleFileChange(e, "bankStatement")}
            className="w-full p-2 border border-gray-300"
            required
          />
        </div>

        {/* Upload Other Transaction File */}
        <div>
          <label className="block">Other Transaction File</label>
          <input
            type="file"
            onChange={(e) => handleFileChange(e, "otherTransactionFile")}
            className="w-full p-2 border border-gray-300"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white p-2 w-full"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}

export default LoanApplication;
