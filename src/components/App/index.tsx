import {
  Navigate, Route, Routes, useNavigate,
} from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import jwtDecode from 'jwt-decode';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { axiosInstance } from '../../utils/axios';
import { checkIsLogged, findUser } from '../../store/reducers/user';
import QuizCreate from '../../pages/QuizCreate';
import Home from '../../pages/Home';
import Layout from '../Layout';
import Login from '../../pages/Login';
import NotFound from '../NotFound';
import Profil from '../../pages/Profil';
import ProtectedRoute from '../ProtectedRoute';
import ProfilSettings from '../../pages/Profil-Settings';
import ProfilQuiz from '../../pages/ProfilQuiz';
import Register from '../../pages/Register';
import Quiz from '../../pages/QuizList';
import QuizGame from '../../pages/QuizGame';
import QuizUpdate from '../../pages/QuizUpdate';
import { ILevel } from '../../@types/level';
import { IOneQuiz } from '../../@types/quiz';
import { ITag } from '../../@types/tag';
import { IQuizList } from '../../@types/quizList';
import './styles.scss';
import About from '../../pages/AboutUs';
import ProfilFavorites from '../../pages/ProfilFavorites';
import ProfilHistory from '../../pages/Profil-History';
import { IScoreHistory } from '../../@types/quizHistory';

function App() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // * STATE
  // Vérifie si l'utilisateur est connecté
  const isLogged = useAppSelector((state) => state.user.isLogged);

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
    level_id: 0,
    user_id: 0,
    level: {
      name: '',
    },
    author: {
      pseudo: '',
    },
    tags: [],
    questions: [],
  });

  // Stocke la liste des quiz favoris de l'utilisateur connecté
  const [userFavoritesQuiz, setUserFavoritesQuiz] = useState<IQuizList[]>([]);

  // Stocke l'historique des quiz joués par l'utilisateur connecté
  const [quizHistory, setQuizHistory] = useState<IScoreHistory[]>([]);

  // Stocke le score global de l'utilisateur connecté
  const [userAverageScore, setUserAverageScore] = useState<number | null>(null);

  //* Maintient de la connexion utilisateur au refresh de la page
  // Au rechargement de la page on doit vérifier si un token éxiste déjà et sa validité
  useEffect(() => {
    // On recherche dans le local storage si un token existe
    const tokenDataStr = localStorage.getItem('token');
    const tokenData = tokenDataStr ? (JSON.parse(tokenDataStr)) : null;

    if (tokenData) {
      try {
        // Si un token existe, on vérifie s'il n'est pas expiré
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
      } catch (error) {
        console.error(error);
      }
    }
  }, [dispatch, isLogged]);

  //* Appel API: récupère la liste des quiz (informations afficher les Card)
  const fetchQuizList = useCallback(async () => {
    try {
      const response = await axiosInstance.get('/quiz');
      // Si pas de réponse 200 envoi erreur
      if (response.status !== 200) {
        throw new Error();
      }
      // met à jour le state avec les données envoyées par l'API
      setQuizList(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    // Récupère la liste des quiz au chargement de la page
    fetchQuizList();

    //* Appel API: récupère la liste des catégories/tags
    const fetchTags = async () => {
      try {
        const response = await axiosInstance.get('/tag');
        // Si pas de réponse 200 envoi erreur
        if (response.status !== 200) {
          throw new Error();
        }
        // met à jour le state avec les données envoyées par l'API
        setTagsList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    // Récupère la liste des catégorie au chargement de la page
    fetchTags();

    //* Appel API: récupère la liste des levels/niveaux
    const fetchLevels = async () => {
      try {
        const response = await axiosInstance.get('/level');
        // Si pas de réponse 200 envoi erreur
        if (response.status !== 200) {
          throw new Error();
        }
        // met à jour le state avec les données envoyées par l'API
        setLevelsList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLevels();
  }, [fetchQuizList]);

  //* Appel API: récupère un quiz selon son id
  // est rappelé selon l'id de l'url de la page
  const getQuizDetails = useCallback(async (id: number) => {
    try {
      const response = await axiosInstance.get(`/quiz/${id}`);
      if (response.status !== 200) {
        throw new Error('Failed to fetch quiz details');
      }
      const { data } = response;
      if (data) {
        // Met à jour le state avec les données du quiz
        setOneQuiz(data);
      } else {
        navigate('/404');
      }
    } catch (error) {
      console.log(error);
    }
  }, [navigate]);

  //* Appel API: récupère la liste quiz favoris de l'utilisateur connecté
  useEffect(() => {
    const fetchUserFavoritesQuiz = async () => {
      try {
        const response = await axiosInstance.get('/profile/favorites');
        // Si pas de réponse 200 envoi erreur
        if (response.status !== 200) {
          throw new Error();
        }
        // récupère les données de la réponse
        const { data } = response;
        // Mise à jour du state des quiz favoris au format de la liste des quiz
        setUserFavoritesQuiz(data.favorites);
      } catch (error) {
        console.log(error);
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
      const response = await axiosInstance.post('/profile/favorites/add', { quiz_id: quizId });
      if (response.status !== 200) {
        throw new Error('Failed to add quiz to favorite');
      }
      // récupère les données de la réponse (message du back)
      const { data } = response;

      // Ajout du quiz aux quiz favoris dans le state (on récupère le quiz puis ajout)
      const addedQuiz = quizList.find((quiz) => quiz.id === quizId);
      if (addedQuiz) {
        setUserFavoritesQuiz([...userFavoritesQuiz, addedQuiz]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //* Appel API: supprime un quiz des favoris de l'utilisateur connecté
  const deleteQuizToFavorite = async (quizId:number) => {
    try {
      const response = await axiosInstance.delete('/profile/favorites/delete', { data: { quiz_id: quizId } });
      if (response.status !== 200) {
        throw new Error('Failed to add quiz to favorite');
      }
      const { data } = response;
      // Suppression du quiz des quiz favoris dans le state (on exclu le quiz en filtrant)
      const filteredFavoritesQuiz = userFavoritesQuiz.filter((quiz) => quiz.id !== quizId);
      setUserFavoritesQuiz(filteredFavoritesQuiz);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //* Appel API: récupère la liste des quiz joués par l'utilisateur connecté
    const fetchQuizHistory = async () => {
      try {
        const response = await axiosInstance.get('/profile/history');
        // Si pas de réponse 200 envoi erreur
        if (response.status !== 200) {
          throw new Error();
        }
        // Récupère les données de la réponse
        const { data } = response;
        console.log('data', data);

        // Mise à jour du state avec les données inversées de la réponse
        setQuizHistory(data);
      } catch (error) {
        console.log(error);
      }
    };
    // Excecute l'appel API si l'utilisateur est connecté sinon vide le state
    if (isLogged) {
      fetchQuizHistory();
    } else {
      setQuizHistory([]);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
        console.error(error);
      }
    };
    // Excecute l'appel API si l'utilisateur est connecté sinon vide le state
    if (isLogged) {
      fetchAverageScore();
    } else {
      setUserAverageScore(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged, quizHistory]);

  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/quiz"
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
              quizHistory={quizHistory}
              setQuizHistory={setQuizHistory}
            />
          )}
        />
        <Route
          path="/connexion"
          element={<Login />}
        />
        <Route
          path="/inscription"
          element={<Register />}
        />
        <Route
          path="/apropos"
          element={<About />}
        />
        <Route
          path="/profile"
          element={(
            <ProtectedRoute>
              <Profil userAverageScore={userAverageScore} />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/profile/parametres"
          element={(
            <ProtectedRoute>
              <ProfilSettings />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/profile/historique"
          element={(
            <ProtectedRoute>
              <ProfilHistory quizHistory={quizHistory} />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/profile/quiz"
          element={(
            <ProtectedRoute>
              <ProfilQuiz
                quizList={quizList}
                setQuizList={setQuizList}
                userFavoritesQuiz={userFavoritesQuiz}
                addQuizToFavorite={addQuizToFavorite}
                deleteQuizToFavorite={deleteQuizToFavorite}
              />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/profile/quiz/creer-quiz"
          element={(
            <ProtectedRoute>
              <QuizCreate
                tagsList={tagsList}
                levelsList={levelsList}
                fetchQuizList={fetchQuizList}
              />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/profile/quiz/modifier-quiz/:id"
          element={(
            <ProtectedRoute>
              <QuizUpdate
                tagsList={tagsList}
                levelsList={levelsList}
                getQuizDetails={getQuizDetails}
                oneQuiz={oneQuiz}
                fetchQuizList={fetchQuizList}
              />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/profile/favoris"
          element={(
            <ProtectedRoute>
              <ProfilFavorites
                userFavoritesQuiz={userFavoritesQuiz}
                addQuizToFavorite={addQuizToFavorite}
                deleteQuizToFavorite={deleteQuizToFavorite}
              />
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
