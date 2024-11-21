import React from "react";
import LoanHistory from "../components/LoanHistory";

function LoanHistoryPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h2 className="text-3xl font-semibold mb-8 text-blue-600">Your Loan History</h2>
      <LoanHistory />
    </div>
  );
}

export default LoanHistoryPage;
