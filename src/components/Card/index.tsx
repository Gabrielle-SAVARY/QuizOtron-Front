import { useState } from 'react';
import './styles.scss';
import { MdFavoriteBorder, MdFavorite, MdFace } from 'react-icons/md';

function Card() {
  const [favorite, setFavorite] = useState(false);

  // Fonction qui permet de changer l'icone de favoris
  const toggleFavorite = () => {
    setFavorite(!favorite);
  };

  return (
    <article className="card">
      <a href="/#">
        <div className="card-header">
          <img
            className="card-header__img"
            src="https://source.unsplash.com/600x400/?car,automobile"
            alt="Quiz"
          />
        </div>
        <div className="card-body">
          <h4 className="card-body__title">Titre Quiz</h4>
          <div className="card-body__tag">
            <span className="card-body__categorie">Catégorie</span>
            <span className="card-body__difficulty">Difficulté</span>
          </div>
          <div className="card-body__tag2">
            <div className="card-body__autor">
              <span className="autor__img">
                <MdFace size={36} stroke="#fff" strokeWidth="1" />
              </span>
              <span className="autor__name">Auteur</span>
            </div>
            <button
              type="button"
              className="card-body__favoris"
              onClick={toggleFavorite}
            >
              {favorite ? (
                <MdFavoriteBorder size={36} />
              ) : (
                <MdFavorite color="red" size={36} />
              )}
            </button>
          </div>
        </div>
      </a>
    </article>
  );
}

export default Card;
