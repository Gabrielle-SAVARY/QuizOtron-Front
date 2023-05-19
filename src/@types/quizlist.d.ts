export interface IQuiz {
  id: number
  title: string
  description: string
  thumbnail: string
  created_at: string
  updated_at: string
  level_id: number
  user_id: number
  level: Level
  author: Author
  tags: Tag[]
}

export interface Author {
  pseudo: string
}

export interface Level {
  name: string
  id: number
}

export interface Tag {
  name: string
  quiz_has_tag: QuizHasTag
  id: number
}

export interface QuizHasTag {
  created_at: string
  updated_at: string
  tag_id: number
  quiz_id: number
}
