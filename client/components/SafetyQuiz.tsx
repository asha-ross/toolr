import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SafetyModal({ onClose, checkQuizAnswers }) {
  // Define state variables using useState
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({}) // Type userAnswers as object with string keys and values
  const [quizPassed, setQuizPassed] = useState(false)
  const storeQuizCompletion = () => {
    sessionStorage.setItem('quizTaken', 'true')
  }
  const quizQuestions = [
    {
      id: 1,
      question:
        'Should you wear safety glasses and ear protection when using power tools?',
      options: ['Yes', 'No'],
      answer: 'Yes',
    },
    {
      id: 2,
      question: 'Is it safe to use an electrically powered tool in the rain?',
      options: ['Yes', 'No'],
      answer: 'Yes',
    },
    {
      id: 3,
      question:
        'Do you accept full responsibility the safety of yourself and others while using this tool?',
      options: ['Yes', 'No'],
      answer: 'Yes',
    },
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

  const handleSubmit = () => {
    evaluateQuiz()
    if (quizPassed) {
      Navigate('/product-page?quizPassed=true')
    } else {
      Navigate('/product-page?quizFailed=true')
    }
  }
  return (
    <div className="safety-quiz">
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
      <button onClick={handleSubmit}>Submit</button>
      {quizPassed && <p>Quiz passed! You can now rent the tool.</p>}
      {!quizPassed && <p>Please review the answers and try again.</p>}
    </div>
  )
}
