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
  Tooltip,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Card from '../../components/Card';
import { IQuizList } from '../../@types/quizList';
import { useAppSelector } from '../../hooks/redux';
import { axiosInstance } from '../../utils/axios';
import BtnExit from '../../components/BtnExit';

interface ProfilQuizProps {
  quizList: IQuizList[]
  setQuizList: (quizList: IQuizList[]) => void
  userFavoritesQuiz: IQuizList[]
  addQuizToFavorite: (quizId: number) => void
  deleteQuizToFavorite: (quizId: number) => void
}
function ProfilQuiz({
  quizList, setQuizList, userFavoritesQuiz, addQuizToFavorite, deleteQuizToFavorite,
}: ProfilQuizProps) {
  //* STATE
  // Récupère le pseudo dans le reducer user
  const pseudo = useAppSelector((state) => state.user.credentials.pseudo);
  // Stocke les quiz d'un utilisateur
  const [userQuiz, setUserQuiz] = useState<IQuizList[]>([]);
  // Toggle: Ouvre et ferme la modale pour la confirmation de suppression d'un quiz
  const [showModal, setShowModal] = useState<boolean>(false);

  //* Filtre des quiz de l'utilisateur du profil
  useEffect(() => {
    // On filtre les quiz par le pseudo utilisateur à partir du state quizList (dans composant App)
    const filterUserQuiz = (): IQuizList[] => quizList.filter(
      (quiz) => quiz.author.pseudo === pseudo,
    );
    // On stocke les quiz filtrés dans le state userQuiz
    const quizFiltered = filterUserQuiz();
    setUserQuiz(quizFiltered);
  }, [pseudo, quizList]);

  //* Ouvre et ferme la modale de confirmation pour la suppression d'un quiz
  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  //* Appel API: suppression d'un quiz
  const handleDeleteQuiz = async (cardId: number) => {
    try {
      const response = await axiosInstance.delete(`/quiz/user/delete/${cardId}`);
      // Si pas de réponse 200 envoi erreur
      if (response.status !== 200) {
        throw new Error();
      }
      //* On met à jour le state quizList sans faire de requête API
      // On récupère une copie des quiz actuels
      const oldQuizz = [...quizList];
      //* On exclu le quiz supprimé grâce à son id
      // On filtre : on garde les quiz dont l'id ne correspond pas à cardId
      const newQuizzList = oldQuizz.filter((quiz) => quiz.id !== cardId);
      // met à jour le state quizList
      setQuizList(newQuizzList);
    } catch (error) {
      console.log(error);
    }
    handleCloseModal();
  };

  return (
    <div className="quiz__management">
      <div className="quiz__management__header">
      <BtnExit/>        
      <h1 className="quiz__management__header-title">Gérer mes Quiz</h1>
      </div>
      <div className="quiz__management__add-Btn">
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          component={NavLink}
          to="/profile/quiz/creer-quiz"
        >
          Créer un quiz
        </Button>
      </div>

      <div>
        <h2 className="quiz__management__subtitle">Liste des mes quiz</h2>
        {userQuiz && (

        <div className="quiz__content-list">
          {userQuiz.map((quiz) => (
            <div className="card-wrapper" key={quiz.id}>
              <div className="card-buttons">
                <Tooltip title="Supprimer" arrow>
                <IconButton
                  aria-label="delete"
                  className="delete-button"
                  color="error"
                  size="large"
                  onClick={handleOpenModal}
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
                </Tooltip>

                <Tooltip title="Modifier" arrow>
                <IconButton
                  aria-label="edit"
                  className="edit-button"
                  sx={{ color: '#fc9100' }}
                  size="large"
                  component={Link}
                  to={`/profile/quiz/modifier-quiz/${quiz.id}`}
                >
                  <ModeEditIcon fontSize="inherit" />
                </IconButton>
                </Tooltip>

                <Dialog
                  open={showModal}
                  onClose={handleCloseModal}
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitle>Voulez-vous vraiment supprimer ce Quiz?</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                      Attention cette action est irréversible
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseModal} variant="contained">Annuler</Button>
                    <Button
                      endIcon={<DeleteIcon />}
                      onClick={() => handleDeleteQuiz(quiz.id)}
                      variant="contained"
                      color="error"
                    >
                      Supprimer
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>

              <Card
                id={quiz.id}
                title={quiz.title}
                thumbnail={quiz.thumbnail}
                author={quiz.author.pseudo}
                level={quiz.level.name}
                tags={quiz.tags}
                userFavoritesQuiz={userFavoritesQuiz}
                addQuizToFavorite={addQuizToFavorite}
                deleteQuizToFavorite={deleteQuizToFavorite}
              />
            </div>
          ))}
        </div>

        )}

      </div>
    </div>
  );
}

export default ProfilQuiz;
