import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import LoanApplicationPage from "./pages/LoanApplicationPage";
import FAQPage from "./pages/FAQPage";
import ContactUsPage from "./pages/ContactUsPage";
import LoanReviewPage from "./pages/LoanReviewPage"; // Loan Review Page for Bankers
import LoanHistoryPage from "./pages/LoanHistoryPage";
import RepaymentTrackerPage from "./pages/RepaymentTrackerPage";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null); // Tracks whether user or banker

  const login = (type) => {
    setIsLoggedIn(true);
    setUserType(type);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserType(null);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} userType={userType} logout={logout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage login={login} />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected routes */}
        <Route 
          path="/loan-application" 
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <LoanApplicationPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/loan-history" 
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <LoanHistoryPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/repayment-tracker" 
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <RepaymentTrackerPage />
            </ProtectedRoute>
          } 
        />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        
        {/* Protected route for loan-review page (for bankers only) */}
        <Route 
          path="/loan-review" 
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              {userType === "banker" ? (
                <LoanReviewPage />
              ) : (
                <Navigate to="/" />
              )}
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
