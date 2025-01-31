import React, { useEffect, useState, useRef } from "react";

interface QuizPageProps {
  onComplete: (score: number, attempted: number, correct: number, wrong: number) => void;
}

const QuizPage: React.FC<QuizPageProps> = ({ onComplete }) => {
  const [quizData, setQuizData] = useState<
    { id: number; description: string; options: { id: number; description: string; is_correct: boolean }[] }[]
  >([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
  const [score, setScore] = useState(0);
  const [attempted, setAttempted] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchedOnce = useRef(false);

  useEffect(() => {
    const fetchQuizData = async () => {
      if (fetchedOnce.current) return;

      try {
        const response = await fetch("https://api.jsonserve.com/Uw5CrX");
        const data = await response.json();

        if (data.questions && data.questions.length > 0) {
          setQuizData(data.questions);
          setSelectedAnswers(new Array(data.questions.length).fill(null));  
        }
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      } finally {
        setLoading(false);
        fetchedOnce.current = true;
      }
    };

    fetchQuizData();
  }, []);

  const handleAnswer = (id: number) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestion] = id;
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    const selectedOptionId = selectedAnswers[currentQuestion];

    if (selectedOptionId !== null) {
      setAttempted((prev) => prev + 1);

      const isCorrect = quizData[currentQuestion].options.find((opt) => opt.id === selectedOptionId)?.is_correct;
      if (isCorrect) {
        setScore((prev) => prev + 4);
        setCorrect((prev) => prev + 1);
      } else {
        setScore((prev) => prev - 1);
        setWrong((prev) => prev + 1);
      }
    }

    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setTimeout(() => {
        onComplete(score, attempted, correct, wrong);
      }, 0);
    }
  };

  if (loading) {
    return <p className="text-center text-lg">Loading quiz...</p>;
  }

  if (quizData.length === 0) {
    return <p className="text-center text-lg text-red-500">No quiz data available.</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Question {currentQuestion + 1}</h2>
      <p className="mb-4">{quizData[currentQuestion].description}</p>
      <div className="space-y-2  mb-6">
        {quizData[currentQuestion].options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleAnswer(option.id)}
            className={`w-full text-left bg-gray-200 p-2 rounded ${
              selectedAnswers[currentQuestion] === option.id ? "bg-violet-300" : "bg-gray-100"
            }`}
          >
            {option.description}
          </button>
        ))}
      </div>
      <div className="flex justify-between">
        {currentQuestion > 0 && (
          <button onClick={handleBack} className="font-bold py-2 px-4 bg-blue-500 text-white rounded">
            Back
          </button>
        )}

        <button
          onClick={handleNext}
          disabled={selectedAnswers[currentQuestion] === null}
          className={`${
            currentQuestion === quizData.length - 1 ? "bg-green-500 hover:bg-green-700" : "bg-blue-500 hover:bg-blue-700"
          } text-white font-bold py-2 px-4 rounded ${selectedAnswers[currentQuestion] === null ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {currentQuestion === quizData.length - 1 ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default QuizPage;
