import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './styles.scss';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Card from '../../components/Card';
import { IAllQuiz } from '../../@types/quizList';
import { useAppSelector } from '../../hooks/redux';
import { axiosInstance } from '../../utils/axios';

interface ProfilQuizProps {
  quizList: IAllQuiz[]
  setQuizList: (quizList: IAllQuiz[]) => void
}
function ProfilQuiz({ quizList, setQuizList }: ProfilQuizProps) {
  // State: récupère pseudo du reducer user
  const pseudo = useAppSelector((state) => state.user.credentials.pseudo);
  // State: stocke les quiz d'un utilisateur
  const [userQuiz, setUserQuiz] = useState<IAllQuiz[]>([]);

  // State ouvre et ferme la modale pour la confirmation de suppression d'un quiz
  const [showModal, setShowModal] = useState<boolean>(false);

  //* Filtre des quiz de l'utilisateur du profil
  useEffect(() => {
    const filterUserQuiz = (): IAllQuiz[] => quizList.filter(
      (quiz) => quiz.author.pseudo === pseudo,
    );
    const quizFiltered = filterUserQuiz();
    setUserQuiz(quizFiltered);
  }, [pseudo, quizList]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  // Ferme la modal de confirmation pour la suppression d'un quiz
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Appel API: suppression d'un quiz
  const handleDeleteQuiz = async (cardId: number) => {
    try {
      const response = await axiosInstance.delete(`/quiz/user/delete/${cardId}`);
      // Si pas de réponse 200 envoi erreur
      if (response.status !== 200) {
        throw new Error();
      }
      console.log('response', response);
      // On récupère une copie des quizz actuels
      const oldQuizz = [...quizList];
      // On filtre : pour chaque quizz, si l'id du quizz (q) ne
      // correspond pas a cardId on le stock dans newQuizzList
      // A la fin on a tout les quizz saut celui qu'on vient de supprimer en back
      const newQuizzList = oldQuizz.filter((q) => q.id !== cardId);
      setQuizList(newQuizzList);
      // met à jour le state avec les données envoyées par l'API
    } catch (error) {
      console.log(error);
    }

    handleCloseModal();
  };

  return (
    <div className="quiz__management">
      <h1 className="quiz__title">Gérer mes Quiz</h1>
      <NavLink to="/profile/quiz/creer-quiz">
        <button type="button" className="quiz__button">
          Créer un quiz
        </button>
      </NavLink>
      <div>
        <h2 className="quiz__subtitle">Liste des mes quiz</h2>
        {userQuiz && (
          <div>
            <div className="content-list">
              {userQuiz.map((quiz) => (
                <div key={quiz.id}>
                  <Card
                    id={quiz.id}
                    title={quiz.title}
                    thumbnail={quiz.thumbnail}
                    author={quiz.author.pseudo}
                    level={quiz.level.name}
                    tags={quiz.tags}
                  />
                  <div className="card-buttons">
                    <Button
                      variant="contained"
                      type="button"
                      className="edit-button"
                      color="success"
                      endIcon={<ModeEditIcon />}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      type="button"
                      className="delete-button"
                      endIcon={<DeleteIcon />}
                      color="error"
                      onClick={handleOpenModal}
                    >
                      Supprimer
                    </Button>
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
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default ProfilQuiz;
