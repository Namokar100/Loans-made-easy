import React from "react";

function ContactUsPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="mb-2">We’d love to hear from you! Reach out to us using the following methods:</p>
      <ul>
        <li>Email: <a href="mailto:support@loanportal.com" className="text-blue-500">support@loanportal.com</a></li>
        <li>Phone: <a href="tel:+1234567890" className="text-blue-500">+1 (234) 567-890</a></li>
        <li>Address: 123 Loan Portal Lane, Finance City, FC 12345</li>
      </ul>
      <h2 className="text-2xl font-bold mt-6">Support Hours</h2>
      <p>Monday to Friday: 9:00 AM - 5:00 PM</p>
    </div>
  );
}

export default ContactUsPage;
