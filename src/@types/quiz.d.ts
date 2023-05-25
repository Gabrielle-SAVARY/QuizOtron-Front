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
    name: string,
    quiz_has_tag: {
      created_at: string,
      updated_at: string,
      tag_id: number,
      quiz_id: number,
    },
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
  name: string
  quiz_has_tag: QuizHasTag
}

export interface QuizHasTag {
  created_at: string
  updated_at: string
  tag_id: number
  quiz_id: number
}

export interface Question {
  id: number
  question: string
  created_at: string
  updated_at: string
  quiz_id: number
  answers: Answer[]
}

export interface Answer {
  id: number
  answer: string
  is_valid: boolean
  created_at: string
  updated_at: string
  question_id: number
}
