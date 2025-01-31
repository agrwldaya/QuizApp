import type React from "react"

interface RulesPageProps {
  onStart: () => void
}

const RulesPage: React.FC<RulesPageProps> = ({ onStart }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Quiz Rules</h2>
      <ul className="list-disc list-inside mb-6">
        <li>The quiz consists of 10 questions.</li>
        <li>Each correct answer is worth 4 points.</li>
        <li>Each incorrect answer deducts 1 point.</li>
        <li>You must answer all questions to complete the quiz.</li>
        <li>Click 'Next' to move to the next question.</li>
        <li>The final question will have a 'Submit' button instead of 'Next'.</li>
      </ul>
      <button onClick={onStart} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Start Quiz
      </button>
    </div>
  )
}

export default RulesPage

