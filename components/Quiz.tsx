'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

type Question = {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

type QuizProps = {
  questions: Question[];
  onComplete: (score: number) => void;
}

export default function Quiz({ questions, onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])

  const handleAnswer = (answer: number) => {
    setAnswers([...answers, answer])
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      const score = answers.filter((answer, index) => answer === questions[index].correctAnswer).length
      onComplete(score)
    }
  }

  const question = questions[currentQuestion]

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">{question.text}</h2>
      <RadioGroup onValueChange={(value) => handleAnswer(parseInt(value))}>
        {question.options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <RadioGroupItem value={index.toString()} id={`option-${index}`} />
            <Label htmlFor={`option-${index}`}>{option}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}
