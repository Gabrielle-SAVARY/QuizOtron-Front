// Type résultat requête: trouve un quiz selon son id "/quiz/:id"
export interface IOneQuiz {
  id: number
  title: string
  description: string
  thumbnail: string
  level_id: number
  user_id: number
  level: {
    name: string
  }
  author: Author
  tags: {
    id: number
    name: string,
  }[]
  questions: {
    id: number
    question: string

    // non dans la requête patch (update quiz)
    quiz_id: number
    answers:
    {
      id: number
      answer: string
      is_valid: boolean

      // non dans la requête patch (update quiz)    question_id:number
      question_id:number
    } [],

  } []
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
}

export interface Question {
  id: number
  question: string

  // non dans la requête patch (update quiz)
  quiz_id: number
  answers:
  {
    id: number
    answer: string
    is_valid: boolean

    // non dans la requête patch (update quiz)    question_id:number
    question_id:number
  } [],

}

export interface Answer {
  id: number
  answer: string
  is_valid: boolean
  question_id: number
}
