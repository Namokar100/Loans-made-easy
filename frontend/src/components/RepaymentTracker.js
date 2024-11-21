import React from "react";

function RepaymentTracker() {
  const repaymentDetails = {
    totalLoan: 50000,
    amountPaid: 20000,
    balance: 30000,
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full sm:w-96">
      <h3 className="text-2xl font-semibold mb-4">Loan Repayment Status</h3>
      <p><strong>Total Loan:</strong> ${repaymentDetails.totalLoan}</p>
      <p><strong>Amount Paid:</strong> ${repaymentDetails.amountPaid}</p>
      <p><strong>Remaining Balance:</strong> ${repaymentDetails.balance}</p>
    </div>
  );
}

export default RepaymentTracker;
