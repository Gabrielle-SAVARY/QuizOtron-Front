import { useState } from 'react';
import './styles.scss';
import { MdFavoriteBorder, MdFavorite, MdFace } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Tag } from '../../@types/quiz';

interface CardProps {
  /*   id: number; */
  title: string;
  thumbnail: string;
  level: string;
  author: string;
  tags: Tag[];
}

function Card({
  title, thumbnail, level, author, tags,
}: CardProps) {
  const [favorite, setFavorite] = useState(false);

  // Met à jour la couleur l'icone de favoris
  const toggleFavorite = () => {
    setFavorite(!favorite);
  };

  return (
    <div>
      <article className="card">
        <Link to="/quiz/:id">
          <div className="card-header">
            <img
              className="card-header__img"
              src={thumbnail}
              alt="Quiz"
            />
          </div>
          <div className="card-body">
            <h4 className="card-body__title">{title}</h4>
            <div className="card-body__tag">
              {tags && (
                <span className="card-body__categorie">
                  {tags.map((tag) => (
                    <span key={tag.name}>
                      {tag.name}
                    </span>
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
        </Link>
      </article>

    </div>
  );
}

export default Card;
