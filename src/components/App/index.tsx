import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import jwtDecode from 'jwt-decode';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { axiosInstance } from '../../utils/axios';
import { checkIsLogged, findUser } from '../../store/reducers/user';
import QuizCreate from '../../pages/QuizCreate';
import Home from '../../pages/Home';
import Layout from '../Layout';
import Login from '../../pages/Login';
import Profil from '../../pages/Profil';
import ProtectedRoute from '../ProtectedRoute';
import ProfilSettings from '../../pages/Profil-Settings';
import ProfilQuiz from '../../pages/Profil-Quiz';
import Register from '../../pages/Register';
import Quiz from '../../pages/QuizList';
import QuizGame from '../../pages/QuizGame';
import QuizUpdate from '../../pages/QuizUpdate';
import { ILevel } from '../../@types/level';
import { IOneQuiz } from '../../@types/quiz';
import { ITag } from '../../@types/tag';
import { IQuizList } from '../../@types/quizList';
import './styles.scss';
import NotFound from '../NotFound';

function App() {
  const dispatch = useAppDispatch();
  // State: utilisateur est connecté
  const isLogged = useAppSelector((state) => state.user.isLogged);

  // State: liste des quiz
  const [quizList, setQuizList] = useState<IQuizList[]>([]);

  // State: liste des tags/catégories d'un quiz
  const [tagsList, setTagsList] = useState<ITag[]>([]);

  // State: liste des levels/niveaux d'un quiz
  const [levelsList, setLevelsList] = useState<ILevel[]>([]);

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

  //* Maintient de la connexion utilisateur
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

        // Si le token est expiré: on passe isLogged à false + on supprime le token du localStorage
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

  //* Appel API: récupère la liste des quiz
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
      // Met à jour le state avec les données du quiz
      setOneQuiz(data);
      return data;
    } catch (error) {
      throw new Error('Failed to fetch quiz details');
    }
  }, []);
  console.log('quizList', quizList);

  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/quiz"
          element={<Quiz quizList={quizList} />}
        />
        <Route path="/quiz/:id" element={<QuizGame getQuizDetails={getQuizDetails} oneQuiz={oneQuiz} />} />
        <Route
          path="/connexion"
          element={<Login />}
        />
        <Route
          path="/inscription"
          element={<Register />}
        />
        <Route
          path="/profile"
          element={(
            <ProtectedRoute>
              <Profil />
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
          path="/profile/quiz"
          element={(
            <ProtectedRoute>
              <ProfilQuiz quizList={quizList} setQuizList={setQuizList} />
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
        <Route path="/404" element={<NotFound />} />
        <Route path="" element={<Navigate to="/404" replace />} />
      </Routes>
    </Layout>

  );
}

export default App;
