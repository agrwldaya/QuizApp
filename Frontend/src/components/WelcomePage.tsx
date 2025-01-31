import type React from "react"
import image from '../assets/image.png'
interface WelcomePageProps {
  onStart: () => void
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onStart }) => {
  return (
    <div className="text-center p-10  frame">
      <h1 className="text-3xl text-white font-bold mb-6">Welcome to the Quiz!</h1>
      <p className="text-xl font-bold mb-8">Test your knowledge with our exciting quiz.</p>
      <button onClick={onStart} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Start Quiz
      </button>
    </div>
  )
}

export default WelcomePage

