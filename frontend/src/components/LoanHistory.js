import React from "react";

function LoanHistory() {
  const loans = [
    { id: "1", amount: 10000, type: "Personal", status: "Ongoing" },
    { id: "2", amount: 50000, type: "Home", status: "Paid" },
  ];

  return (
    <table className="min-w-full bg-white shadow-md rounded-lg">
      <thead>
        <tr className="border-b">
          <th className="px-4 py-2 text-left">Loan ID</th>
          <th className="px-4 py-2 text-left">Amount</th>
          <th className="px-4 py-2 text-left">Type</th>
          <th className="px-4 py-2 text-left">Status</th>
        </tr>
      </thead>
      <tbody>
        {loans.map((loan) => (
          <tr key={loan.id}>
            <td className="px-4 py-2">{loan.id}</td>
            <td className="px-4 py-2">${loan.amount}</td>
            <td className="px-4 py-2">{loan.type}</td>
            <td className="px-4 py-2">{loan.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default LoanHistory;
