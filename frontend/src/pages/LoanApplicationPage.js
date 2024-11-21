import React from "react";
import LoanApplication from "../components/LoanApplication";

function LoanApplicationPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h2 className="text-3xl font-semibold mb-8 text-blue-600">Apply for a Loan</h2>
      <LoanApplication />
    </div>
  );
}

export default LoanApplicationPage;
