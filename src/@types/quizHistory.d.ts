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
  level: ILevel
  author: IAuthor
  tags: ITag[]
}
