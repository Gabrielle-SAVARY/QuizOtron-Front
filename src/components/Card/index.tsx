import { useState, useEffect } from 'react';
import { MdFavoriteBorder, MdFavorite, MdFace } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { IQuizList, TagQList } from '../../@types/quizList';
import './styles.scss';

interface CardProps {
  id: number;
  title: string;
  thumbnail: string;
  level: string;
  author: string;
  tags: TagQList[];
  userFavoritesQuiz: IQuizList[];
  addQuizToFavorite: (quizId: number) => void;
  deleteQuizToFavorite: (quizId: number) => void;
}

function Card({
  id, title, thumbnail, level, author, tags, userFavoritesQuiz,
  addQuizToFavorite, deleteQuizToFavorite,
}: CardProps) {
  //* STATE
  // Stocke si l'utilisateur est connecté
  const isLogged = useAppSelector((state) => state.user.isLogged);
  // Stocke si le quiz est dans les favoris de l'utilisateur
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  //* Vérifie si le quiz est dans les favoris de l'utilisateur
  const checkFavorite = (carId: number, arrayFavoritesQuiz: IQuizList[]) => {
    const favoriteQuiz = arrayFavoritesQuiz.find((quiz) => quiz.id === carId);
    if (favoriteQuiz) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  };
  useEffect(() => {
    checkFavorite(id, userFavoritesQuiz);
  }, [id, userFavoritesQuiz]);

  //* Ajoute un quiz aux favoris de l'utilisateur
  const handleAddFavorite = (event: React.MouseEvent<HTMLButtonElement>, quizId: number) => {
    // Empêche le lien (sur toute la Card) vers le jeu de quiz de s'ouvrir
    event.preventDefault();
    addQuizToFavorite(quizId);
  };

  //* Supprime un quiz des favoris de l'utilisateur
  const handleDeleteFavorite = (event: React.MouseEvent<HTMLButtonElement>, quizId: number) => {
    // Empêche le lien (sur toute la Card) vers le jeu de quiz de s'ouvrir
    event.preventDefault();
    deleteQuizToFavorite(quizId);
  };

  //* Gestion rendu bouton favoris
  const handleFavoriteBtn = () => {
    if (isLogged) {
      if (isFavorite) {
        //* Bouton favoris avec icon remplie + fonction supprimer des favoris
        return (
          <button
            type="button"
            className="card-body__btn-favoris"
            title="Supprimer des favoris"
            onClick={(event) => handleDeleteFavorite(event, id)}
          >
            <MdFavorite color="red" size={36} />
          </button>
        );
      } if (!isFavorite) {
        //* Bouton favoris avec icon vide + fonction ajouter aux favoris
        return (
          <button
            type="button"
            className="card-body__btn-favoris"
            title="Ajouter aux favoris"
            onClick={(event) => handleAddFavorite(event, id)}
          >
            <MdFavoriteBorder size={36} />
          </button>
        );
      }
    }
    return null;
  };

  return (
    <div>
      <article className="card">
        <Link to={`/quiz/${id}`}>
          <div className="card-header">
            <img className="card-header__img" src={thumbnail} alt="Quiz" />
          </div>

          <div className="card-body">
            <h4 className="card-body__title">{title}</h4>
            <div className="card-body__tag">
              {tags && (
              <span className="card-body__categorie">
                {tags.map((tag) => (
                  <span key={tag.name}>{tag.name}</span>
                ))}
              </span>
              )}
              <span className="card-body__difficulty">{level}</span>
            </div>
            <div className="card-body__tag2">
              <div className="card-body__autor">
                <span className="autor__img">
                  <MdFace size={36} stroke="#fff" strokeWidth="1" />
                </span>
                <span className="autor__name">{author}</span>
              </div>
              { handleFavoriteBtn()}
            </div>
          </div>
        </Link>
      </article>
    </div>
  );
}

export default Card;
