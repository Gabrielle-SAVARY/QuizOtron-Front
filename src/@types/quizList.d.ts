import { ILevel } from './level';
import { ITag } from './tag';
// Type résultat requête tous les quiz "/quiz"
export interface IQuizList {
  id: number
  title: string
  description: string
  thumbnail: string
  level: ILevel
  author: IAuthor
  tags: ITag[]
}

export interface IAuthor {
  id: number
  pseudo: string
}
