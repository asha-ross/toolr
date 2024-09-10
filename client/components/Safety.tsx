import React, { useState } from 'react'

export default function SafetyModal({ onClose }) {
  // Explicitly use onClose prop for modal closing functionality (optional)
  // const handleClose = () => onClose();

  // Define state variables using useState
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({}) // Type userAnswers as object with string keys and values
  const [quizPassed, setQuizPassed] = useState(false)

  const quizQuestions = [
    {
      id: 1,
      question:
        'Should you wear safety glasses and ear protection when using power tools?',
      options: ['Yes', 'No'],
      answer: 'Yes',
    },
    // Add more questions here
  ]

  const handleAnswerChange = (questionId: number, answer: string) => {
    setUserAnswers({ ...userAnswers, [questionId.toString()]: answer }) // Convert questionId to string for object key
  }

  const evaluateQuiz = () => {
    let isPassed = true
    for (const question of quizQuestions) {
      if (userAnswers[question.id] !== question.answer) {
        isPassed = false
        break
      }
    }
    setQuizPassed(isPassed)
  }

  return (
    <div className="safety-modal">
      <h2>Safety Quiz</h2>
      {quizQuestions.map((question, index) => (
        <div key={index}>
          <p>{question.question}</p>
          {question.options.map((option, optionIndex) => (
            <div key={optionIndex}>
              <input
                type="radio"
                name={`question_${index}`}
                value={option}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
              />
              <label>{option}</label>
            </div>
          ))}
        </div>
      ))}
      <button onClick={evaluateQuiz}>Submit</button>
      {quizPassed && <p>Quiz passed! You can now rent the tool.</p>}
      {!quizPassed && <p>Please review the answers and try again.</p>}
    </div>
  )
}
