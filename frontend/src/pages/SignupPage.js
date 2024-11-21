import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
    aadhar: "",
    pan: "",
    businessType: "",
    businessEmail: "",
    businessContact: "",
    userType: "personal",
    otp: "", // User can manually input OTP
  });

  const [otpSent, setOtpSent] = useState(false); // Track OTP step

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    // Simulate OTP sent (user can now enter any number)
    setOtpSent(true); // Mark OTP as sent
    console.log("OTP sent (simulated): User can enter any number");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // No OTP validation, user can submit after entering any OTP
    console.log("Signup Completed with Data:", formData);
    navigate("/login"); // Redirect to login after successful signup
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Signup</h1>
      <form onSubmit={otpSent ? handleSubmit : handleSendOtp} className="space-y-4">
        <div>
          <label className="block">User Type</label>
          <div>
            <label className="mr-4">
              <input
                type="radio"
                name="userType"
                value="personal"
                checked={formData.userType === "personal"}
                onChange={handleChange}
              />
              Personal
            </label>
            <label>
              <input
                type="radio"
                name="userType"
                value="business"
                checked={formData.userType === "business"}
                onChange={handleChange}
              />
              Business
            </label>
          </div>
        </div>

        {formData.userType === "personal" ? (
          <>
            <div>
              <label className="block">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300"
                required
              />
            </div>
            <div>
              <label className="block">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300"
                required
              />
            </div>
            <div>
              <label className="block">Contact No.</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300"
                required
              />
            </div>
            <div>
              <label className="block">Aadhar</label>
              <input
                type="text"
                name="aadhar"
                value={formData.aadhar}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300"
                required
              />
            </div>
            <div>
              <label className="block">PAN Card</label>
              <input
                type="text"
                name="pan"
                value={formData.pan}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300"
                required
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block">Business Type</label>
              <select
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300"
                required
              >
                <option value="">Select Business Type</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Retail">Retail</option>
                <option value="Wholesale">Wholesale</option>
                <option value="Service">Service</option>
                <option value="Technology">Technology</option>
                <option value="Financial Services">Financial Services</option>
                <option value="Construction">Construction</option>
                <option value="Transportation">Transportation</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Food and Beverage">Food and Beverage</option>
                <option value="Telecommunications">Telecommunications</option>
                <option value="Energy">Energy</option>
                <option value="Consulting">Consulting</option>
                <option value="Non-Profit">Non-Profit</option>
                <option value="Media">Media</option>
                <option value="Logistics">Logistics</option>
                <option value="Art and Crafts">Art and Crafts</option>
                <option value="Automotive">Automotive</option>
                <option value="Tourism">Tourism</option>
                <option value="E-Commerce">E-Commerce</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block">Business Email</label>
              <input
                type="email"
                name="businessEmail"
                value={formData.businessEmail}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300"
                required
              />
            </div>
            <div>
              <label className="block">Business Contact No.</label>
              <input
                type="text"
                name="businessContact"
                value={formData.businessContact}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300"
                required
              />
            </div>
            <div>
              <label className="block">Business Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300"
                required
              />
            </div>
          </>
        )}

        <div>
          <label className="block">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300"
            required
          />
        </div>
        <div>
          <label className="block">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300"
            required
          />
        </div>

        {otpSent && (
          <div>
            <label className="block">OTP</label>
            <input
              type="text"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300"
              required
            />
          </div>
        )}

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white p-2 w-full"
        >
          {otpSent ? "Signup" : "Send OTP"}
        </button>
      </form>
    </div>
  );
}

export default SignupPage;
