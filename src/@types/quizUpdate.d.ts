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
