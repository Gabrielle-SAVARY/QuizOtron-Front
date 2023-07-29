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
  level_id: number
  user_id: number
  favorite: Favorite
}

export interface Favorite {
  quiz_id: number
  user_id: number
}
