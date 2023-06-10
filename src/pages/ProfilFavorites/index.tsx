import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './styles.scss';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Card from '../../components/Card';
import { IQuizList } from '../../@types/quizList';
import { useAppSelector } from '../../hooks/redux';
import { axiosInstance } from '../../utils/axios';

interface ProfilQuizProps {
  userFavoritesQuiz: IQuizList[]
  addQuizToFavorite: (quizId: number) => void;
}
function ProfilFavorites({ userFavoritesQuiz, addQuizToFavorite }: ProfilQuizProps) {
  return (
    <div className="quiz__favoris">
      <h1 className="quiz__title">Mes quiz favoris</h1>

      <div>
        {userFavoritesQuiz && (

        <div className="quiz__content-list">
          {userFavoritesQuiz.map((quiz) => (
            <Card
              key={quiz.id}
              id={quiz.id}
              title={quiz.title}
              thumbnail={quiz.thumbnail}
              author={quiz.author.pseudo}
              level={quiz.level.name}
              tags={quiz.tags}
              addQuizToFavorite={addQuizToFavorite}
            />
          ))}
        </div>

        )}

      </div>
    </div>
  );
}

export default ProfilFavorites;
