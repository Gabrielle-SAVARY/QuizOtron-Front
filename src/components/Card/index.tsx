import { useState } from 'react';
import { MdFavoriteBorder, MdFavorite, MdFace } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { axiosInstance } from '../../utils/axios';
import { IOneQuiz } from '../../@types/quiz';
import { IQuizList, TagQList } from '../../@types/quizList';
import './styles.scss';

interface CardProps {
  id: number;
  title: string;
  thumbnail: string;
  level: string;
  author: string;
  tags: TagQList[];
  addQuizToFavorite: (quizId: number) => void;
  /*   userFavoritesQuiz: IQuizList[];
  setUserFavoritesQuiz: (userFavoritesQuiz: IQuizList[]) => void; */

}

function Card({
  id, title, thumbnail, level, author, tags, addQuizToFavorite,
}: CardProps) {
  //* STATE
  const isLogged = useAppSelector((state) => state.user.isLogged);
  // TODO lien de la card (mis uniqument sur l'image -> doit être sur tout Card) + bouton favoris
  // TODO gérer les  boutons pour les favoris

  // TODO ajout des favoris utilisateurs: pour l'instant change uniquement la couleur de l'icone
  const [favorite, setFavorite] = useState<boolean>(false);
  // Met à jour la couleur l'icone de favoris
  const toggleFavorite = () => {
    setFavorite(!favorite);
  };

  const handleAddFavorite = (event: React.MouseEvent<HTMLButtonElement>, quizId: number) => {
    console.log('passe ici', 'passe ici');
    addQuizToFavorite(quizId);
  };

  return (
    <div>
      <article className="card">
        <Link to={`/quiz/${id}`}>
          <div className="card-header">
            <img className="card-header__img" src={thumbnail} alt="Quiz" />
          </div>

        </Link>
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
            <button
              type="button"
              className="card-body__btn-favoris"
              title="Ajouter aux favoris"
              onClick={(event) => handleAddFavorite(event, id)}
            >
              {!isLogged ? (
                <MdFavoriteBorder size={36} />
              ) : (
                <MdFavorite color="red" size={36} />
              )}
            </button>
          </div>
        </div>

      </article>
    </div>
  );
}

export default Card;
