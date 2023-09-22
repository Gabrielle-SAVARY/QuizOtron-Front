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
import { useAppSelector } from '../../hooks/redux';
import { axiosInstance } from '../../utils/axios';
import { handleAxiosErrors } from '../../utils/axiosError';
import { IAxiosError } from '../../@types/error';
import { IQuizList } from '../../@types/quizList';
import Card from '../../components/Card';
import LinkExit from '../../components/LinkExit';

interface ProfileQuizProps {
  quizList: IQuizList[]
  setQuizList: (quizList: IQuizList[]) => void
  userFavoritesQuiz: IQuizList[]
  addQuizToFavorite: (quizId: number) => void
  deleteQuizToFavorite: (quizId: number) => void
  setSuccessMessage: (successMessage: string) => void;
  setErrorMessage: (value: string) => void;
}
function ProfileQuiz({
  quizList, setQuizList, userFavoritesQuiz, addQuizToFavorite, deleteQuizToFavorite,
  setSuccessMessage, setErrorMessage,
}: ProfileQuizProps) {
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
  const handleDeleteQuiz = async (quizId: number) => {
    try {
      const response = await axiosInstance.delete(`/profile/quiz/${quizId}`);
      const newMessage: string = response.data.message;
      //* On met à jour le state quizList sans faire de requête API
      // On récupère une copie des quiz actuels
      const oldQuizz = [...quizList];
      //* On exclu le quiz supprimé grâce à son id
      // On filtre : on garde les quiz dont l'id ne correspond pas à cardId
      const newQuizzList = oldQuizz.filter((quiz) => quiz.id !== quizId);
      // met à jour le state quizList et le message de succès
      setQuizList(newQuizzList);
      setSuccessMessage(newMessage);
    } catch (error) {
      const errorAxios = handleAxiosErrors(error as IAxiosError);
      setErrorMessage(errorAxios);
    }
    handleCloseModal();
  };

  return (
    <div className="quiz__management">
      <div className="quiz__management__header">
        <LinkExit redirectionLink="/profil" />
        <h1 className="quiz__management__header-title profile-page-title">Gérer mes Quiz</h1>
      </div>
      <div className="quiz__management__add-Btn">
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          component={NavLink}
          to="/profil/quiz/creer-quiz"
        >
          Créer un quiz
        </Button>
      </div>

      <div>
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
                    onClick={() => handleOpenModal()}
                  >
                    <DeleteIcon fontSize="inherit" />
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

                <Tooltip title="Modifier" arrow>
                  <IconButton
                    aria-label="edit"
                    className="edit-button"
                    sx={{ color: '#fc9100' }}
                    size="large"
                    component={Link}
                    to={`/profil/quiz/modifier-quiz/${quiz.id}`}
                  >
                    <ModeEditIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>

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

export default ProfileQuiz;
