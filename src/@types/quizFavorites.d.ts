import { IAuthor } from './quizList';
import { ILevel } from './level';
import { ITag } from './tag';

// Type résultat requête tous les quiz favoris de l'utilisateur connecté "/profile/favorites"
export interface IGetFavorites {
  id: number
  pseudo: string
  email: string
  firstname: string
  lastname: string
  global_score:
  {
    quiz_score: number
    user_id: number
    quiz_id: number
  }[]
  role_id: number
  favorites:QuizFavorites[]
}

export interface QuizFavorites {
  id: number
  title: string
  description: string
  thumbnail: string
  level: ILevel
  author: IAuthor
  tags: ITag[]
  favorite: Favorite
}

export interface Favorite {
  quiz_id: number
  user_id: number
}
