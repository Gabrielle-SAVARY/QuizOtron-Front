// Type résultat requête: trouve un quiz selon son id "/quiz/:id"
export interface IOneQuiz {
  id: number
  title: string
  description: string
  thumbnail: string
  level: {
    id: number
    name: string
  }
  author: {
    id: number
    pseudo: string
  }
  tags: {
    id: number
    name: string,
  }[]
  questions: {
    id: number
    question: string
    quiz_id: number // non dans la requête patch (update quiz)
    answers:
    {
      id: number
      answer: string
      is_valid: boolean
      question_id:number // non dans la requête patch (update quiz)    question_id:number
    } [],

  } []
}
