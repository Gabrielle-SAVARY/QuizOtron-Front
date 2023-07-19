// Type format attendu par le back pour la mise à jour d'un quiz
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

  // champs non attendu par le back mais utilisé pour le formulaire
  [field: string]: string | number
}

export interface QuestionUp {
  id: number
  question: string
  answers:{
    id: number
    answer: string
    is_valid: boolean

  }[],
}
export interface AnswerUp {
  id: number
  answer: string
  is_valid: boolean
}

// Type résultat requête converti (sans quiz_id  et question_id):
// trouve un quiz selon son id "/quiz/:id"
export interface IUpdatedOneQuiz {
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
    answers:
    {
      id: number
      answer: string
      is_valid: boolean
    } [],

  } []
}
