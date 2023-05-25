export interface IQuizUpdated {
  quiz: QuizUp
  questions: QuestionUp[]
}

export interface QuizUp {
  title: string
  description: string
  thumbnail: string
  level_id: number
  user_id: number
  tag_id: number
  [field: string]: string | number
}

export interface QuestionUp {
  id: number
  question: string
  answers: [
    {
      id: number
      answer: string
      is_valid: boolean
    },
  ]
}

export interface AnswerUp {
  id: number
  answer: string
  is_valid: boolean
}
