import type React from "react"
import { useState } from "react"
import WelcomePage from "./components/WelcomePage"
import RulesPage from "./components/RulesPage"
import QuizPage from "./components/QuizPage"
import ResultPage from "./components/ResultPage"

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<"welcome" | "rules" | "quiz" | "result">
  ("welcome")
  const [score, setScore] = useState(0)
  const [attempted, setAttempted] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [wrong, setWrong] = useState(0)

  const startQuiz = () => setCurrentPage("rules")
  const beginQuiz = () => setCurrentPage("quiz")
  const backtoHome = ()=>{setCurrentPage("welcome")}

  const endQuiz = (finalScore: number, totalAttempted: number, totalCorrect: number, totalWrong: number) => {
    setScore(finalScore)
    setAttempted(totalAttempted)
    setCorrect(totalCorrect)
    setWrong(totalWrong)
    setCurrentPage("result")
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center   frame">
      <div className="w-full max-w-2xl  bg-transparent border mx-5 shadow-2xl rounded-lg p-8">
        {currentPage === "welcome" && <WelcomePage onStart={startQuiz} />}
        {currentPage === "rules" && <RulesPage onStart={beginQuiz} />}
        {currentPage === "quiz" && <QuizPage onComplete={endQuiz} />}
        {currentPage === "result" && <ResultPage backtoHome={backtoHome} score={score} attempted={attempted} correct={correct} wrong={wrong} />}
      </div>
    </div>
  )
}

export default App

