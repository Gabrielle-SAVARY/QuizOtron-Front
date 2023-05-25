export interface IOneQuiz {
  id: number
  title: string
  description: string
  thumbnail: string
  created_at: string
  updated_at: string
  level_id: number
  user_id: number
  level: {
    name: string
  }
  author: Author
  tags: [{
    id: number
    name: string,
    created_at: string,
    updated_at: string,
  }]
  questions: Question[]
  answers: Answer[]
}

export interface Level {
  name: string
}

export interface Author {
  pseudo: string
}

export interface Tag {
  id: number,
  name: string
  created_at: string
  updated_at: string
}

export interface Question {
  id: number
  question: string
  answers: [
    {
      id: number
      answer: string
      is_valid: boolean
    },
  ]
  quiz_id: number

}

export interface Answer {
  id: number
  answer: string
  is_valid: boolean
  created_at: string
  updated_at: string
  question_id: number
}
