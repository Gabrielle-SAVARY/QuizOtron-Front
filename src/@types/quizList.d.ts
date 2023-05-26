// Type résultat requête tous les quiz "/quiz"
export interface IQuizList {
  id: number
  title: string
  description: string
  thumbnail: string
  level_id: number
  user_id: number
  level: LevelQList
  author: Author
  tags: TagQList[]
}

export interface LevelQList {
  name: string
  id: number
}

export interface AuthorQList {
  pseudo: string
}

export interface TagQList {
  name: string
  quiz_has_tag: QuizHasTagQList
}

export interface QuizHasTagQList {
  tag_id: number
  quiz_id: number
}
