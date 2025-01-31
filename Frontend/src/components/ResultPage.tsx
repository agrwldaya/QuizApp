
interface ResultPageProps {
backtoHome: () => void; 
  score: number;
  attempted: number;
  correct: number;
  wrong: number;
}
const ResultPage: React.FC<ResultPageProps> = ({backtoHome, score, attempted, correct, wrong }) => {
  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold mb-8 text-primary">Quiz Results</h2>
      
      
         
          <p className="text-3xl font-bold mb-3 text-green-600">Congratulations!</p>
          <p className="text-xl text-black mb-5">You've completed the quiz!</p>

      <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
        <div className="bg-violet-200  p-6 rounded-lg shadow-md">
          <p className="text-2xl font-bold text-blue-600">{score}</p>
          <p className="text-black">Your Score</p>
        </div>
        <div className="bg-violet-200  p-6 rounded-lg shadow-md">
          <p className="text-2xl font-bold text-purple-600">{attempted}</p>
          <p className="text-black">Attempted</p>
        </div>
        <div className="bg-violet-200  p-6 rounded-lg shadow-md">
          <p className="text-2xl font-bold text-green-600">{correct}</p>
          <p className="text-black">Correct</p>
        </div>
        <div className="bg-violet-200  p-6 rounded-lg shadow-md">
          <p className="text-2xl font-bold text-red-600">{wrong}</p>
          <p className="text-black">Wrong</p>
        </div>
      </div>

        <p className="text-xl text-black mt-4">
          {score > (attempted * 4) / 2
            ? "Great job! You've done well on this quiz."
            : "Keep practicing! You're on the right track."}
        </p>

        <button onClick={backtoHome} className='bg-blue-500 mt-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' >Back to Home</button>
    </div>
  );
};

export default ResultPage;