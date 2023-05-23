import { useEffect, useState } from 'react';
import './styles.scss';
import { MdFavoriteBorder, MdFavorite, MdFace } from 'react-icons/md';

import { Link, useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
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
  // State pour ajouter aux favoris de l'utilisateur
  // TODO ajout des favoris utilisateurs: pour l'instant change uniquement la couleur de l'icone
  const [favorite, setFavorite] = useState(false);

  // State pour vérifier si on se trouve sur la page du profil utilisateur: gestion de ses quiz
  const [isProfileQuizRoute, setIsProfileQuizRoute] = useState(false);
  // On cherche la localisation de la page
  const location = useLocation();
  // * Vérification si la page actuelle est bien "profile/quiz": gestion des quiz utilisateurs
  // Si oui ajout de 2 boutons pour l'édition et la suppression du quiz
  useEffect(() => {
    const checkLocation = () => {
      const locationPath = location.pathname;
      console.log('location.pathname', locationPath);
      if (locationPath === '/profile/quiz') {
        setIsProfileQuizRoute(true);
      }
    };
    checkLocation();
  });

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
            {isProfileQuizRoute && (
            <div className="card-buttons">
              <Button variant="contained" type="button" className="edit-button" color="success" startIcon={<ModeEditIcon />}>

                Edit
              </Button>
              <Button variant="contained" type="button" className="delete-button" startIcon={<DeleteIcon />} color="error">
                Supprimer
              </Button>
            </div>
            )}
          </div>
        </Link>
      </article>

    </div>
  );
}

export default Card;
