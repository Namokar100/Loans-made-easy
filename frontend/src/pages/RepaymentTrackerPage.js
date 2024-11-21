import React from "react";
import RepaymentTracker from "../components/RepaymentTracker";

function RepaymentTrackerPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h2 className="text-3xl font-semibold mb-8 text-blue-600">Repayment Tracker</h2>
      <RepaymentTracker />
    </div>
  );
}

export default RepaymentTrackerPage;
