import {
  Navigate, Route, Routes, useNavigate,
} from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import jwtDecode from 'jwt-decode';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { checkIsLogged, findUser } from '../../store/reducers/user';
import { axiosInstance } from '../../utils/axios';
import { handleAxiosErrors } from '../../utils/axiosError';
import QuizCreate from '../../pages/QuizCreate';
import Home from '../../pages/Home';
import Layout from '../Layout';
import Login from '../../pages/Login';
import NotFound from '../NotFound';
import About from '../../pages/AboutUs';
import Confidentiality from '../../pages/Confidentiality';
import LegalNotice from '../../pages/LegalNotice';
import Profile from '../../pages/Profile';
import ProfileFavorites from '../../pages/ProfileFavorites';
import ProfileHistory from '../../pages/ProfileHistory';
import ProtectedRoute from '../ProtectedRoute';
import ProfileSettings from '../../pages/ProfileSettings';
import ProfileQuiz from '../../pages/ProfileQuiz';
import Register from '../../pages/Register';
import Quiz from '../../pages/QuizList';
import QuizGame from '../../pages/QuizGame';
import QuizUpdate from '../../pages/QuizUpdate';
import { IScoreHistory } from '../../@types/quizHistory';
import { ILevel } from '../../@types/level';
import { IOneQuiz } from '../../@types/quiz';
import { ITag } from '../../@types/tag';
import { IQuizList } from '../../@types/quizList';
import { IAxiosError } from '../../@types/error';
import './styles.scss';

function App() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // * STATE
  // Vérifie si l'utilisateur est connecté
  const isLogged = useAppSelector((state) => state.user.isLogged);

  // Stocke message d'erreur
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  // Liste des quiz (informations pour une Card)
  const [quizList, setQuizList] = useState<IQuizList[]>([]);

  // Liste des tags/catégories d'un quiz
  const [tagsList, setTagsList] = useState<ITag[]>([]);

  // Liste des levels/niveaux d'un quiz
  const [levelsList, setLevelsList] = useState<ILevel[]>([]);

  // Stocke un quiz selon son id
  const [oneQuiz, setOneQuiz] = useState<IOneQuiz>({
    id: 0,
    title: '',
    description: '',
    thumbnail: '',
    level: {
      id: 0,
      name: '',
    },
    author: {
      id: 0,
      pseudo: '',
    },
    tags: [],
    questions: [],
  });

  // Stocke la liste des quiz favoris de l'utilisateur connecté
  const [userFavoritesQuiz, setUserFavoritesQuiz] = useState<IQuizList[]>([]);

  // Stocke l'historique des quiz joués par l'utilisateur connecté
  const [quizHistory, setQuizHistory] = useState<IScoreHistory[]>([]);

  // Stocke le score moyen de l'utilisateur connecté
  const [userAverageScore, setUserAverageScore] = useState<number | null>(null);

  //* Maintient de la connexion utilisateur au refresh de la page
  // Au rechargement de la page on doit vérifier si un token éxiste déjà et sa validité
  useEffect(() => {
    // On recherche dans le local storage si un token existe
    const tokenDataStr = localStorage.getItem('token');
    const tokenData = tokenDataStr ? (JSON.parse(tokenDataStr)) : null;
    if (!tokenData) {
      dispatch(checkIsLogged(false));
      return;
    }
    const { exp } = jwtDecode(tokenData) as {
      exp: number;
    };
    // On calcule le timestamp de la date et heure actuelle
    const now = Math.floor(Date.now() / 1000);

    // Si le token est expiré: déconnexion utilisateur + on supprime le token du localStorage
    if (now >= exp) {
      dispatch(checkIsLogged(false));
      localStorage.removeItem('token');
    } else {
      // Si le token est valide: on passe isLogged à true
      // on cherche l'utilisateur et on met à jour les states de l'utilsiateur
      dispatch(checkIsLogged(true));
      dispatch(findUser());
    }
  }, [dispatch, isLogged]);

  //* Appel API: récupère la liste des quiz (informations afficher les Card)
  const fetchQuizList = useCallback(async () => {
    try {
      const response = await axiosInstance.get('/quiz');
      setQuizList(response.data);
    } catch (error) {
      const errorAxios = handleAxiosErrors(error as IAxiosError);
      setErrorMessage(errorAxios);
    }
  }, []);

  //* Appel API: récupère la liste des catégories/tags
  const fetchTags = async () => {
    try {
      const response = await axiosInstance.get('/tag');
      setTagsList(response.data);
    } catch (error) {
      const errorAxios = handleAxiosErrors(error as IAxiosError);
      setErrorMessage(errorAxios);
    }
  };

  //* Appel API: récupère la liste des levels/niveaux
  const fetchLevels = async () => {
    try {
      const response = await axiosInstance.get('/level');
      // met à jour le state avec les données envoyées par l'API
      setLevelsList(response.data);
    } catch (error) {
      const errorAxios = handleAxiosErrors(error as IAxiosError);
      setErrorMessage(errorAxios);
    }
  };
  useEffect(() => {
    // Récupère la liste des quiz au chargement de la page
    fetchQuizList();
    // Récupère la liste des catégorie au chargement de la page
    fetchTags();
    // Récupère la liste des niveaux au chargement de la page
    fetchLevels();
  }, [fetchQuizList]);

  //* Appel API: récupère un quiz selon son id
  // est rappelé selon l'id de l'url de la page
  const getQuizDetails = useCallback(async (id: number) => {
    try {
      const response = await axiosInstance.get(`/quiz/${id}`);
      setOneQuiz(response.data);
    } catch (error) {
      const errorAxios = handleAxiosErrors(error as IAxiosError);
      setErrorMessage(errorAxios);
      navigate('/404');
    }
  }, [navigate]);

  //* Appel API: récupère la liste quiz favoris de l'utilisateur connecté
  useEffect(() => {
    const fetchUserFavoritesQuiz = async () => {
      try {
        const response = await axiosInstance.get('/profile/favorites');
        const { data } = response;
        // Mise à jour du state des quiz favoris au format de la liste des quiz
        setUserFavoritesQuiz(data.favorites);
      } catch (error) {
        const errorAxios = handleAxiosErrors(error as IAxiosError);
        setErrorMessage(errorAxios);
      }
    };
    // Excecute l'appel API si l'utilisateur est connecté sinon vide le state
    if (isLogged) {
      fetchUserFavoritesQuiz();
    } else {
      setUserFavoritesQuiz([]);
    }
  }, [isLogged, quizList]);

  //* Appel API: ajoute un quiz aux favoris de l'utilisateur connecté
  const addQuizToFavorite = async (quizId:number) => {
    try {
      const response = await axiosInstance.post('/profile/favorites', { quiz_id: quizId });
      // récupère le message du back
      const newMessage: string = response.data.message;
      // Ajout du quiz aux quiz favoris dans le state (on récupère le quiz puis ajout)
      const addedQuiz = quizList.find((quiz) => quiz.id === quizId);
      if (addedQuiz) {
        setUserFavoritesQuiz([...userFavoritesQuiz, addedQuiz]);
        setSuccessMessage(newMessage);
      }
    } catch (error) {
      const errorAxios = handleAxiosErrors(error as IAxiosError);
      setErrorMessage(errorAxios);
    }
  };

  //* Appel API: supprime un quiz des favoris de l'utilisateur connecté
  const deleteQuizToFavorite = async (quizId:number) => {
    try {
      const response = await axiosInstance.delete('/profile/favorites', { data: { quiz_id: quizId } });
      // récupère le message du back
      const newMessage: string = response.data.message;
      // Suppression du quiz des quiz favoris dans le state (on exclu le quiz en filtrant)
      const filteredFavoritesQuiz = userFavoritesQuiz.filter((quiz) => quiz.id !== quizId);
      if (filteredFavoritesQuiz) {
        setUserFavoritesQuiz(filteredFavoritesQuiz);
        setSuccessMessage(newMessage);
      }
    } catch (error) {
      const errorAxios = handleAxiosErrors(error as IAxiosError);
      setErrorMessage(errorAxios);
    }
  };

  useEffect(() => {
    //* Appel API: récupère la liste des quiz joués par l'utilisateur connecté
    const fetchQuizHistory = async () => {
      try {
        const response = await axiosInstance.get('/profile/history');
        // Récupère les données de la réponse
        const { data } = response;
        // Mise à jour du state avec les données inversées de la réponse
        setQuizHistory(data);
        // console.log('FETCH quizHistory', quizHistory);
      } catch (error) {
        const errorAxios = handleAxiosErrors(error as IAxiosError);
        setErrorMessage(errorAxios);
      }
    };
    // Excecute l'appel API si l'utilisateur est connecté sinon vide le state
    if (isLogged) {
      fetchQuizHistory();
    } else {
      setQuizHistory([]);
    }
  }, [isLogged]);

  useEffect(() => {
    //* Appel API: récupère la moyenne des scores aux quiz joué par l'utilisateur connecté
    const fetchAverageScore = async () => {
      try {
        const response = await axiosInstance.get('/profile/score');
        // Si pas de réponse 200 envoi erreur
        if (response.status !== 200) {
          throw new Error();
        }
        const { data } = response;
        const averageNumber = Number(data[0].averageScore);
        setUserAverageScore(averageNumber);
      } catch (error) {
        const errorAxios = handleAxiosErrors(error as IAxiosError);
        setErrorMessage(errorAxios);
      }
    };
    // Excecute l'appel API si l'utilisateur est connecté sinon vide le state
    if (isLogged) {
      // TODO: à revoir avec state reducer
      fetchAverageScore();
    } else {
      setUserAverageScore(null);
    }
  }, [isLogged, quizHistory]);

  return (
    <Layout
      errorMessage={errorMessage}
      setErrorMessage={setErrorMessage}
      successMessage={successMessage}
      setSuccessMessage={setSuccessMessage}
    >
      <Routes>
        <Route
          path="/"
          element={(
            <Home
              quizList={quizList}
              userFavoritesQuiz={userFavoritesQuiz}
              addQuizToFavorite={addQuizToFavorite}
              deleteQuizToFavorite={deleteQuizToFavorite}
            />
)}
        />
        <Route
          path="/liste-quiz"
          element={(
            <Quiz
              quizList={quizList}
              tagsList={tagsList}
              levelsList={levelsList}
              userFavoritesQuiz={userFavoritesQuiz}
              addQuizToFavorite={addQuizToFavorite}
              deleteQuizToFavorite={deleteQuizToFavorite}
            />
        )}
        />
        <Route
          path="/quiz/:id"
          element={(
            <QuizGame
              getQuizDetails={getQuizDetails}
              oneQuiz={oneQuiz}
              setQuizHistory={setQuizHistory}
              setSuccessMessage={setSuccessMessage}
            />
          )}
        />
        <Route
          path="/mentions-legales"
          element={<LegalNotice />}
        />
        <Route
          path="/politique-confidentialite"
          element={<Confidentiality />}
        />
        <Route
          path="/inscription"
          element={<Register />}
        />
        <Route
          path="/connexion"
          element={<Login />}
        />
        <Route
          path="/a-propos"
          element={<About />}
        />
        <Route
          path="/profil"
          element={(
            <ProtectedRoute>
              <Profile userAverageScore={userAverageScore} />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/profil/parametres"
          element={(
            <ProtectedRoute>
              <ProfileSettings />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/profil/quiz"
          element={(
            <ProtectedRoute>
              <ProfileQuiz
                quizList={quizList}
                setQuizList={setQuizList}
                userFavoritesQuiz={userFavoritesQuiz}
                addQuizToFavorite={addQuizToFavorite}
                deleteQuizToFavorite={deleteQuizToFavorite}
                setSuccessMessage={setSuccessMessage}
                setErrorMessage={setErrorMessage}
              />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/profil/quiz/creer-quiz"
          element={(
            <ProtectedRoute>
              <QuizCreate
                tagsList={tagsList}
                levelsList={levelsList}
                fetchQuizList={fetchQuizList}
                setSuccessMessage={setSuccessMessage}
                setErrorMessage={setErrorMessage}
              />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/profil/quiz/modifier-quiz/:id"
          element={(
            <ProtectedRoute>
              <QuizUpdate
                tagsList={tagsList}
                levelsList={levelsList}
                getQuizDetails={getQuizDetails}
                oneQuiz={oneQuiz}
                fetchQuizList={fetchQuizList}
                setSuccessMessage={setSuccessMessage}
                setErrorMessage={setErrorMessage}
              />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/profil/favoris"
          element={(
            <ProtectedRoute>
              <ProfileFavorites
                userFavoritesQuiz={userFavoritesQuiz}
                addQuizToFavorite={addQuizToFavorite}
                deleteQuizToFavorite={deleteQuizToFavorite}
              />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/profil/historique"
          element={(
            <ProtectedRoute>
              <ProfileHistory quizHistory={quizHistory} />
            </ProtectedRoute>
          )}
        />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </Layout>

  );
}

export default App;
