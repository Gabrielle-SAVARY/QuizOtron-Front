// Type résultat requête des quiz joués"
export interface IScoreHistory {
  user_id: number
  id: number
  quiz_score: number
  quiz: IQuizHistory
}

export interface IQuizHistory {
  id: number
  title: string
  description: string
  thumbnail: string
}

/*
export interface IQuizHistory {
  id: number
  pseudo: string
  email: string
  firstname: string
  lastname: string
  global_score: number | null
  role_id: number
  quizzes_scores: IQuizzesScore[]
}

export interface IQuizzesScore {
  id: number
  title: string
  description: string
  thumbnail: string
  level_id: number
  user_id: number
  score: {
    id: number
    quiz_score:number
  }
}
 */
