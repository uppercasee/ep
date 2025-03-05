'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PlusIcon, TrashIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { addQuiz } from '../actions/addQuiz'

type QuestionType = 'mcq' | 'truefalse'

interface Answer {
  id: string
  text: string
  isCorrect: boolean
}

interface Question {
  id: string
  text: string
  type: QuestionType
  points: number
  answers: Answer[]
}

interface Quiz {
  id: string
  title: string
  timeLimit: number
  passingScore: number
  maxAttempts: number
  questions: Question[]
}

interface QuizResourceProps {
  courseId: string
  resource: Omit<Quiz, 'questions'>
  onEditChange: (
    id: string,
    field: Exclude<keyof Quiz, 'questions'>,
    value: string
  ) => void
  onDelete: (id: string) => void
}

const QuizResource = ({
  courseId,
  resource,
  onEditChange,
  onDelete,
}: QuizResourceProps) => {
  const [quiz, setQuiz] = useState<Quiz>({
    id: Math.random().toString(36).substr(2, 9),
    title: 'New Quiz',
    timeLimit: 60,
    passingScore: 60,
    maxAttempts: 1,
    questions: [],
  })

  const handleChange = (field: keyof Quiz, value: string | number) => {
    setQuiz((prev) => ({ ...prev, [field]: value }))
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    handleChange('title', newTitle) // Update local state for quiz title
    onEditChange(quiz.id, 'title', newTitle) // Notify parent component to update the title
  }

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Math.random().toString(36).substr(2, 9),
      text: 'New Question',
      type: 'mcq',
      points: 10,
      answers: [],
    }
    setQuiz((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }))
  }

  const deleteQuestion = (id: string) => {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.filter((q) => q.id !== id),
    }))
    toast.success('Question deleted')
  }

  const addAnswer = (questionId: string) => {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              answers: [
                ...q.answers,
                {
                  id: Math.random().toString(36).substr(2, 9),
                  text: '',
                  isCorrect: false,
                },
              ],
            }
          : q
      ),
    }))
  }

  const handleQuestionChange = (
    questionId: string,
    field: keyof Question,
    value: string | number
  ) => {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === questionId ? { ...q, [field]: value } : q
      ),
    }))
  }

  const handleAnswerChange = (
    questionId: string,
    answerId: string,
    field: keyof Answer,
    value: string | boolean
  ) => {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              answers: q.answers.map((a) =>
                a.id === answerId ? { ...a, [field]: value } : a
              ),
            }
          : q
      ),
    }))
  }

  const deleteAnswer = (questionId: string, answerId: string) => {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === questionId
          ? { ...q, answers: q.answers.filter((a) => a.id !== answerId) }
          : q
      ),
    }))
  }

  const saveQuiz = async () => {
    const result = await addQuiz(quiz, courseId)
    if (result.success) {
      toast.success(`Quiz saved! ID: ${result.quizId}`)
    } else {
      toast.error(result.message)
    }
  }

  return (
    <div className="flex flex-col gap-4 w-full border p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold">Create a Quiz</h2>

      {/* Quiz Title */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="quiz-title">Quiz Title</Label>
        <Input
          id="quiz-title"
          type="text"
          value={quiz.title}
          onChange={handleTitleChange}
          placeholder="Enter quiz title"
        />
      </div>

      {/* Quiz Settings */}
      <div className="grid grid-cols-3 gap-4">
        {/* Time Limit */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="time-limit">Time Limit (mins)</Label>
          <Input
            id="time-limit"
            type="number"
            value={quiz.timeLimit}
            onChange={(e) => handleChange('timeLimit', Number(e.target.value))}
            placeholder="e.g. 30"
          />
        </div>

        {/* Passing Score */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="passing-score">Passing Score (%)</Label>
          <Input
            id="passing-score"
            type="number"
            value={quiz.passingScore}
            onChange={(e) =>
              handleChange('passingScore', Number(e.target.value))
            }
            placeholder="e.g. 60"
          />
        </div>

        {/* Max Attempts */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="max-attempts">Max Attempts</Label>
          <Input
            id="max-attempts"
            type="number"
            value={quiz.maxAttempts}
            onChange={(e) =>
              handleChange('maxAttempts', Number(e.target.value))
            }
            placeholder="e.g. 3"
          />
        </div>
      </div>

      <Button onClick={addQuestion} variant="secondary">
        <PlusIcon className="mr-2" />
        Add Question
      </Button>

      {quiz.questions.map((question) => (
        <div key={question.id} className="border p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <Input
              type="text"
              value={question.text}
              onChange={(e) =>
                handleQuestionChange(question.id, 'text', e.target.value)
              }
              placeholder="Question Text"
            />
            <Button
              onClick={() => deleteQuestion(question.id)}
              variant="destructive"
            >
              <TrashIcon />
            </Button>
          </div>

          <div className="flex gap-2 mt-2">
            <select
              value={question.type}
              onChange={(e) =>
                handleQuestionChange(question.id, 'type', e.target.value)
              }
              className="border rounded-md p-2"
            >
              <option value="mcq">MCQ</option>
              <option value="truefalse">True/False</option>
            </select>
            <Input
              type="number"
              value={question.points}
              onChange={(e) =>
                handleQuestionChange(
                  question.id,
                  'points',
                  Number(e.target.value)
                )
              }
              placeholder="Points"
            />
          </div>

          <Button
            onClick={() => addAnswer(question.id)}
            variant="outline"
            className="mt-2"
          >
            <PlusIcon className="mr-2" />
            Add Answer
          </Button>

          {question.answers.map((answer) => (
            <div key={answer.id} className="flex gap-2 items-center mt-2">
              <input
                type="text"
                value={answer.text}
                onChange={(e) =>
                  handleAnswerChange(
                    question.id,
                    answer.id,
                    'text',
                    e.target.value
                  )
                }
                className="border p-2 rounded-md w-full"
                placeholder="Answer Text"
              />
              <input
                type="checkbox"
                checked={answer.isCorrect}
                onChange={(e) =>
                  handleAnswerChange(
                    question.id,
                    answer.id,
                    'isCorrect',
                    e.target.checked
                  )
                }
              />
              <Button
                onClick={() => deleteAnswer(question.id, answer.id)}
                variant="destructive"
              >
                <TrashIcon />
              </Button>
            </div>
          ))}
        </div>
      ))}

      <Button onClick={saveQuiz}>Save Quiz</Button>
    </div>
  )
}

export default QuizResource
