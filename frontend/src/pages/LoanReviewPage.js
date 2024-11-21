import React, { useState } from 'react';
import UserCard from './UserCard';

function LoanReviewPage() {
  // Sample data for users
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      location: '12345',
      googleReview: '4.5/5',
      quizScore: 85,
      documentVerified: false,
      locationVerified: false,
      googleReviewVerified: false,
      quizVerified: false,
      isVerified: false, // Track overall verification status
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      location: '67890',
      googleReview: '4.0/5',
      quizScore: 90,
      documentVerified: false,
      locationVerified: false,
      googleReviewVerified: false,
      quizVerified: false,
      isVerified: false, // Track overall verification status
    },
    // Add more users as needed
  ]);

  const handleVerification = (userId, verificationType) => {
    const userToVerify = users.find((user) => user.id === userId);

    // Update the user verification status based on the type of verification (document, location, etc.)
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? {
              ...user,
              [verificationType]: !user[verificationType], // Toggle verification status
              isVerified: Object.values(user).every((value) => typeof value === "boolean" && value), // Check if all verification statuses are true
            }
          : user
      )
    );
    
    console.log(`User ${userToVerify.name} is ${userToVerify[verificationType] ? 'unverified' : 'verified'} for ${verificationType}`);
  };

  const handleSubmit = (userId) => {
    // Remove the user card after submission
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));

    // Find the user and log the verified details
    const user = users.find((user) => user.id === userId);
    console.log('Verified details for:', {
      name: user.name,
      documentVerified: user.documentVerified,
      locationVerified: user.locationVerified,
      googleReviewVerified: user.googleReviewVerified,
      quizVerified: user.quizVerified,
    });
  };

  const handleRemoveCard = (userId) => {
    // Remove the card without waiting for submission
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));

    // Find the user and log the verified details
    const user = users.find((user) => user.id === userId);
    console.log('Card removed for:', {
      name: user.name,
      documentVerified: user.documentVerified,
      locationVerified: user.locationVerified,
      googleReviewVerified: user.googleReviewVerified,
      quizVerified: user.quizVerified,
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Loan Review</h1>
      <div className="space-y-4">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            handleVerification={handleVerification}
            handleSubmit={handleSubmit}
            handleRemoveCard={handleRemoveCard} // Pass the remove card function to UserCard
          />
        ))}
      </div>
    </div>
  );
}

export default LoanReviewPage;
