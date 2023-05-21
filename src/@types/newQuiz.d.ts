export interface INewQuiz {
  quiz: Quiz
  questions: Question[]
}

export interface Quiz {
  title: string
  description: string
  thumbnail: string
  level_id: number
  user_id: number
  tag_id: number
  [field: string]: string | number
}

export interface Question {
  question: string
  answers: Answer[]
}

export interface Answer {
  answer: string
  is_valid: boolean
}
