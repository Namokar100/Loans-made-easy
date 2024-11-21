import React from 'react';

function UserCard({ user, handleVerification, handleSubmit, handleRemoveCard }) {
  // Check if the user has verified all details
  const isVerified = user.documentVerified && user.locationVerified && user.googleReviewVerified && user.quizVerified;

  return (
    <div className="border border-gray-300 p-4 rounded-lg space-y-4">
      <h2 className="text-xl font-bold">{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Location: {user.location}</p>
      <p>Google Review: {user.googleReview}</p>
      <p>Quiz Score: {user.quizScore}</p>

      {/* Verification buttons */}
      <div className="space-y-2">
        <button
          onClick={() => handleVerification(user.id, 'documentVerified')}
          className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600"
        >
          {user.documentVerified ? 'Unverify Document' : 'Verify Document'}
        </button>
        <button
          onClick={() => handleVerification(user.id, 'locationVerified')}
          className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600"
        >
          {user.locationVerified ? 'Unverify Location' : 'Verify Location'}
        </button>
        <button
          onClick={() => handleVerification(user.id, 'googleReviewVerified')}
          className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600"
        >
          {user.googleReviewVerified ? 'Unverify Google Review' : 'Verify Google Review'}
        </button>
        <button
          onClick={() => handleVerification(user.id, 'quizVerified')}
          className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600"
        >
          {user.quizVerified ? 'Unverify Quiz' : 'Verify Quiz'}
        </button>
      </div>

      {/* Submit Button */}
      {isVerified && (
        <button
          onClick={() => handleSubmit(user.id)}
          className="bg-green-500 text-white p-2 w-full rounded hover:bg-green-600"
        >
          Submit Verification
        </button>
      )}

      {/* Remove Card Button */}
      <button
        onClick={() => handleRemoveCard(user.id)}
        className="bg-red-500 text-white p-2 w-full rounded hover:bg-red-600"
      >
        Remove Card
      </button>
    </div>
  );
}

export default UserCard;
