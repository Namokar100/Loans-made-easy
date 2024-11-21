import React from "react";
import { Link } from "react-router-dom";

function Navbar({ isLoggedIn, userType, logout }) {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      {/* Left Section - Logo */}
      <div className="font-bold text-xl">
        <Link to="/">Code Monks</Link>
      </div>

      {/* Center Section - Navigation Links */}
      <div className="flex space-x-8 mx-auto">
        {/* Show navigation links only for users, not for bankers */}
        {isLoggedIn && userType === "user" && (
          <>
            <Link to="/" className="hover:text-blue-300">Home</Link>
            <Link to="/faq" className="hover:text-blue-300">FAQ</Link>
            <Link to="/contact-us" className="hover:text-blue-300">Contact Us</Link>
            <Link to="/loan-application" className="hover:text-blue-300">Apply for Loan</Link>
            <Link to="/loan-history" className="hover:text-blue-300">Loan History</Link>
            <Link to="/repayment-tracker" className="hover:text-blue-300">Repayment Tracker</Link>
          </>
        )}
      </div>

      {/* Right Section - Logout */}
      <div className="flex space-x-4">
        {isLoggedIn ? (
          <button
            onClick={logout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="hover:text-blue-300">Login</Link>
            <Link to="/signup" className="hover:text-blue-300">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
