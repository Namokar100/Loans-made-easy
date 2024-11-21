import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { FaSmile, FaMeh, FaFrown } from "react-icons/fa"; // Import react-icons for quiz answers

function SentimentQuizPage() {
  const [answers, setAnswers] = useState([]); // Array to store quiz answers
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleAnswer = (questionIndex, answer) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[questionIndex] = answer;
      return updatedAnswers;
    });
  };

  const handleSubmit = () => {
    console.log("Quiz Data Submitted:", answers);
    // After submitting the quiz data, navigate to the home page
    navigate("/"); // Redirect to home page
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Sentimental Analysis Quiz</h1>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        {/* Loop through 20 questions */}
        {[...Array(20)].map((_, index) => (
          <div key={index}>
            <label className="block mb-2">
              Question {index + 1}: How satisfied are you with your business?
            </label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => handleAnswer(index, "satisfied")}
                className="p-2 bg-green-500 text-white"
              >
                <FaSmile className="text-2xl" />
                Satisfied
              </button>
              <button
                type="button"
                onClick={() => handleAnswer(index, "moderate")}
                className="p-2 bg-yellow-500 text-white"
              >
                <FaMeh className="text-2xl" />
                Moderate
              </button>
              <button
                type="button"
                onClick={() => handleAnswer(index, "not_satisfied")}
                className="p-2 bg-red-500 text-white"
              >
                <FaFrown className="text-2xl" />
                Not Satisfied
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={handleSubmit}
          className="mt-4 bg-blue-600 text-white p-2 w-full"
        >
          Submit Quiz
        </button>
      </form>
    </div>
  );
}

export default SentimentQuizPage;
