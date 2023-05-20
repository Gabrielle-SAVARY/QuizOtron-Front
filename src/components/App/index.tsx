import { Route, Routes } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import Layout from '../Layout';
import Home from '../../pages/Home';
import Quiz from '../../pages/Quiz';
import Login from '../../pages/Login';
import Register from '../../pages/Register';
import Profil from '../../pages/Profil';
import ProtectedRoute from '../ProtectedRoute';
import ProfilSettings from '../../pages/Profil-Settings';

import './styles.scss';
import ProfilQuiz from '../../pages/Profil-Quiz';
import CreateQuiz from '../../pages/Create-Quiz';
import { ITag } from '../../@types/tag';
import { axiosInstance } from '../../utils/axios';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { checkIsLogged } from '../../store/reducers/user';
import { ILevel } from '../../@types/level';

function App() {
  const dispatch = useAppDispatch();
  // State: utilisateur est connecté
  const isLogged = useAppSelector((state) => state.user.isLogged);

  // State: liste des tags/catégories d'un quiz
  const [tagsList, setTagsList] = useState<ITag[]>([]);

  // State: liste des levels/niveaux d'un quiz
  const [levelsList, setLevelsList] = useState<ILevel[]>([]);

  //* Maintient de la connexion utilisateur
  // Au rechargement de la page on doit vérifier si un token éxiste déjà.
  // S'il existe on vérifie s'il est encore valide.
  useEffect(() => {
    // On recherche dans le local storage si un token existe
    const tokenDataStr = localStorage.getItem('token');
    const tokenData = tokenDataStr ? (JSON.parse(tokenDataStr)) : null;

    if (tokenData) {
      try {
        // Si un token existe, on vérifie s'il n'est pas expiré
        const { id, exp } = jwtDecode(tokenData) as {
          id: number;
          exp: number;
        };
        // On calcule le timestamp de la date et heure actuelle
        const now = Math.floor(Date.now() / 1000);
        // Si le token est expiré, on passe isLogged à false
        // et on supprime les données du LocalStorage avec
        // la fonction removeUserDataFromLocalStorage
        if (now >= exp) {
          dispatch(checkIsLogged(false));
        } else {
          dispatch(checkIsLogged(true));
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, [dispatch, isLogged]);

  //* Appel API: récupère la liste des catégories/tags
  // useCallback permet de mémoriser la fonction passer aux composant enfants
  useEffect(() => {
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
    // rappelle de la fonction si le state est modifié
  }, [tagsList]);

  //* Appel API: récupère la liste des levels/niveaux
  // useCallback permet de mémoriser la fonction passer aux composant enfants
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

  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/quiz/:id"
          element={<Quiz />}
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
              <ProfilQuiz />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/profile/quiz/creer-quiz"
          element={(
            <ProtectedRoute>
              <CreateQuiz
                tagsList={tagsList}
                levelsList={levelsList}
                fetchLevels={fetchLevels}
              />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/profile"
          element={(
            <ProtectedRoute>
              <Profil />
            </ProtectedRoute>
          )}
        />
      </Routes>
    </Layout>

  );
}

export default App;
