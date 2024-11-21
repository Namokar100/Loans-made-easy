import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage({ login }) {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    userType: "user", // Default login type is "user"
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data Submitted:", loginData);

    // Trigger the login function with the selected userType
    login(loginData.userType);

    // Navigate to the home page or relevant page based on userType
    if (loginData.userType === "banker") {
      navigate("/loan-review");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Email</label>
          <input
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300"
            required
          />
        </div>
        <div>
          <label className="block">Password</label>
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300"
            required
          />
        </div>
        <div>
          <label className="block">Login as:</label>
          <select
            name="userType"
            value={loginData.userType}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300"
          >
            <option value="user">User</option>
            <option value="banker">Banker</option>
          </select>
        </div>
        <button type="submit" className="mt-4 bg-blue-600 text-white p-2 w-full">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
