import React from "react";

function FAQPage() {
  const faqs = [
    { question: "How do I apply for a loan?", answer: "To apply for a loan, log in and go to the 'Apply for Loan' section." },
    { question: "How can I track my loan repayments?", answer: "Use the 'Repayment Tracker' in the dashboard to view repayment details." },
    { question: "What types of loans are available?", answer: "We offer personal and business loans. Check eligibility criteria on the loan application page." },
    { question: "How can I contact customer support?", answer: "Visit the 'Contact Us' page for support details." },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
      <ul>
        {faqs.map((faq, index) => (
          <li key={index} className="mb-4">
            <h2 className="font-semibold">{faq.question}</h2>
            <p>{faq.answer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FAQPage;
