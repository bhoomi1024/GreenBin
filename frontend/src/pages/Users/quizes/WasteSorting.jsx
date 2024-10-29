import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../../components/AfterLoginUsersComp/usersNavbar';
import Footer from '../../../components/HomePageCompo/Footer';
import wasteSortingQuizData from './wasteSortingQuizData.json'; // Import the JSON file

const WasteSorting = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(new Array(wasteSortingQuizData.questions.length).fill(null));
  const [quizResult, setQuizResult] = useState(null); // For displaying the result

  const handleAnswerSelect = (isCorrect) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestion] = isCorrect;
    setSelectedAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < wasteSortingQuizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const score = selectedAnswers.filter(answer => answer).length;
      setQuizResult(`Quiz completed! You scored ${score} out of ${wasteSortingQuizData.questions.length}.`);
    }
  };

  const handleCloseQuiz = () => {
    // Implement the logic for closing or redirecting after the quiz
    // For example, you could redirect to the homepage or a specific route
    window.location.href = '/Usersawareness'; // Redirect to the homepage
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-5 mb-10">
        <h2 className="text-3xl font-bold mb-5 pt-10 text-center text-green-600">Waste Sorting Quiz</h2>

        {quizResult ? (
          <div className="mt-5 text-center">
            <h3 className="text-xl font-semibold text-blue-600">{quizResult}</h3>
            <button
              onClick={handleCloseQuiz}
              className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="mt-5">
            <h3 className="text-lg font-bold mb-3">{wasteSortingQuizData.questions[currentQuestion].question}</h3>
            <img 
              src={wasteSortingQuizData.questions[currentQuestion].image} 
              alt="Waste" 
              className="my-3 w-48 h-auto mx-auto border rounded shadow-md" // Center the image and add border and shadow
            />
            <div className="mt-4">
              {wasteSortingQuizData.questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option.isCorrect)}
                  className={`block w-full text-left p-3 my-2 rounded-lg border transition duration-200 
                    ${selectedAnswers[currentQuestion] === option.isCorrect ? 'bg-green-200 border-green-400' : 'bg-white border-gray-300 hover:bg-gray-200'}`}
                >
                  {option.text}
                </button>
              ))}
            </div>
            <button
              onClick={handleNextQuestion}
              className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
            >
              {currentQuestion === wasteSortingQuizData.questions.length - 1 ? 'Finish Quiz' : 'Next'}
            </button>
          </div>
        )}
      </div>
      <Footer className="fixed bottom-0 w-full" />
    </>
  );
};

export default WasteSorting;
