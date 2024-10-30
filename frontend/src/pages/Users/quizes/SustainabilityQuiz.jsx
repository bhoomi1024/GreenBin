import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../../components/AfterLoginUsersComp/usersNavbar';
import { Trash2 } from 'lucide-react';
import Footer from '../../../components/HomePageCompo/Footer';
import usersRestaurantData from '../usershome/usersRestaurantdata.json';

const SustainabilityQuiz = () => {
  const [likedRestaurants, setLikedRestaurants] = useState({});
  const [hoveredRestaurant, setHoveredRestaurant] = useState(null);
  const [quizActive, setQuizActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(new Array(5).fill(null));
  const [quizResult, setQuizResult] = useState(null); // New state for quiz result

  const questions = [
    {
      question: "What is the primary benefit of recycling?",
      options: ["Reduces waste", "Saves energy", "Conserves resources", "All of the above"],
      answer: 3 // Correct option index
    },
    {
      question: "Which of the following is a sustainable practice?",
      options: ["Using plastic bags", "Driving a fuel-efficient car", "Leaving the lights on", "Using disposable cups"],
      answer: 1
    },
    {
      question: "What should you do with food waste?",
      options: ["Throw it in the trash", "Compost it", "Burn it", "Ignore it"],
      answer: 1
    },
    {
      question: "How can you reduce water usage?",
      options: ["Take long showers", "Fix leaks", "Water the lawn every day", "Use a hose to wash cars"],
      answer: 1
    },
    {
      question: "What is the impact of plastic pollution?",
      options: ["It has no impact", "It harms wildlife", "It helps marine life", "It is biodegradable"],
      answer: 1
    },
  ];

  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem('likedRestaurants')) || {};
    setLikedRestaurants(storedLikes);
  }, []);

  const handleDelete = (restaurantId) => {
    setLikedRestaurants(prev => {
      const updatedLikes = { ...prev };
      delete updatedLikes[restaurantId];
      localStorage.setItem('likedRestaurants', JSON.stringify(updatedLikes));
      return updatedLikes;
    });
  };

  const handleMouseEnter = (restaurantId) => {
    setHoveredRestaurant(restaurantId);
  };

  const handleMouseLeave = () => {
    setHoveredRestaurant(null);
  };

  const handleAnswerSelect = (index) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestion] = index;
    setSelectedAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const score = selectedAnswers.filter((answer, index) => answer === questions[index].answer).length;
      const description = `Quiz completed! You scored ${score} out of ${questions.length}. ${score === questions.length ? 'Excellent job! You really know your sustainability practices.' : score > questions.length / 2 ? 'Good effort! Keep learning about sustainability.' : 'You might want to review some sustainability topics.'}`;
      
      setQuizResult({ score, description }); // Set quiz result
      setQuizActive(false); // Hide quiz after finishing
      setSelectedAnswers(new Array(5).fill(null));
      setCurrentQuestion(0);
    }
  };

  return (
    <>
      <Navbar />
      <div className="px-5 mb-10">
        <h2 className="text-2xl font-bold mb-5 pt-10">Sustainable Practices</h2>
        
        <div className="mb-5">
          {/* <Link to="/WasteSorting" className="block bg-green-500 text-white rounded-lg p-4 text-center hover:bg-green-600 transition duration-200 mb-2">
            Waste Sorting Practice
          </Link> */}
          <button
            onClick={() => setQuizActive(true)}
            className="block bg-blue-500 text-white rounded-lg p-4 text-center hover:bg-blue-600 transition duration-200"
          >
            Start Sustainability Quiz
          </button>
        </div>
        
        {quizActive ? (
          <div className="mt-5">
            <h3 className="text-lg font-bold">{questions[currentQuestion].question}</h3>
            <div className="mt-2">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`block w-full text-left p-2 my-1 rounded border ${selectedAnswers[currentQuestion] === index ? 'bg-blue-200' : 'bg-white hover:bg-gray-200'}`}
                >
                  {option}
                </button>
              ))}
            </div>
            <button
              onClick={handleNextQuestion}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next'}
            </button>
          </div>
        ) : (
          <>
            {quizResult ? (
              <div className="mt-5">
                <h3 className="text-lg font-bold">Your Score: {quizResult.score} out of {questions.length}</h3>
                <p className="mt-2">{quizResult.description}</p>
              </div>
            ) : (
              Object.keys(likedRestaurants).length === 0 ? (
                <p></p>
              ) : (
                <div className="space-y-3">
                  {Object.entries(likedRestaurants).map(([id, liked]) => {
                    if (!liked) return null;
                    const restaurant = usersRestaurantData.restaurants.find(r => r.id === parseInt(id));
                    if (!restaurant) return null;
                    const isHovered = hoveredRestaurant === restaurant.id;

                    return (
                      <div
                        key={restaurant.id}
                        className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex justify-between items-center shadow-sm hover:shadow-lg relative"
                        onMouseEnter={() => handleMouseEnter(restaurant.id)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <h3 className="text-lg text-gray-800 cursor-pointer">{restaurant.name}</h3>
                        {isHovered && (
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 p-4 bg-white border border-gray-300 rounded-lg shadow-md z-10">
                            <p className="text-sm text-gray-600 mb-1"><strong>Cuisine:</strong> {restaurant.cuisine}</p>
                            <p className="text-sm text-gray-600 mb-1"><strong>Rating:</strong> {'⭐'.repeat(restaurant.rating)}</p>
                            <p className="text-sm text-gray-600 mb-1"><strong>Rating Count:</strong> {restaurant.ratingCount}</p>
                          </div>
                        )}
                        <button
                          className="p-2 rounded-full text-black focus:outline-none"
                          onClick={() => handleDelete(restaurant.id)}
                        >
                          <Trash2 />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )
            )}
          </>
        )}
      </div>
      <Footer className="fixed bottom-0 w-full"/>
    </>
  );
};

export default SustainabilityQuiz;
