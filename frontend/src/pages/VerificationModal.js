import React from 'react';

function VerificationModal({ user, handleVerifyToggle, closeModal }) {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4">Verify {user.name}</h2>

        <div className="mb-4">
          <h3 className="font-semibold">Document Verification:</h3>
          <button
            onClick={() => handleVerifyToggle('documentVerified')}
            className={`bg-${user.documentVerified ? 'red' : 'green'}-500 text-white p-2 mt-2 rounded hover:bg-${user.documentVerified ? 'red' : 'green'}-600`}
          >
            {user.documentVerified ? 'Unverify Document' : 'Verify Document'}
          </button>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold">Location Verification:</h3>
          <button
            onClick={() => handleVerifyToggle('locationVerified')}
            className={`bg-${user.locationVerified ? 'red' : 'green'}-500 text-white p-2 mt-2 rounded hover:bg-${user.locationVerified ? 'red' : 'green'}-600`}
          >
            {user.locationVerified ? 'Unverify Location' : 'Verify Location'}
          </button>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold">Google Review Check:</h3>
          <button
            onClick={() => handleVerifyToggle('googleReviewVerified')}
            className={`bg-${user.googleReviewVerified ? 'red' : 'green'}-500 text-white p-2 mt-2 rounded hover:bg-${user.googleReviewVerified ? 'red' : 'green'}-600`}
          >
            {user.googleReviewVerified ? 'Unverify Google Review' : 'Verify Google Review'}
          </button>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold">Quiz Score Check:</h3>
          <button
            onClick={() => handleVerifyToggle('quizVerified')}
            className={`bg-${user.quizVerified ? 'red' : 'green'}-500 text-white p-2 mt-2 rounded hover:bg-${user.quizVerified ? 'red' : 'green'}-600`}
          >
            {user.quizVerified ? 'Unverify Quiz Score' : 'Verify Quiz Score'}
          </button>
        </div>

        <button
          onClick={closeModal}
          className="bg-red-500 text-white p-2 mt-2 rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default VerificationModal;
