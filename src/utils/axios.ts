import axios from 'axios';

// enregistrement de la configuration de base de axios
export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',

});

// ajout du token dans le header (champs Authorization) de chaque requête
axiosInstance.interceptors.request.use((config) => {
  const tokenStorage = localStorage.getItem('token');
  const token = tokenStorage ? JSON.parse(tokenStorage) : null;

  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = token ? `Bearer ${token}` : '';

  return config;
});

// redirection vers la page de connexion si le token est invalide - erreurs 401
export const interceptorNotAuthorized = (navigate: (path: string) => void) => {
  axiosInstance.interceptors.response.use((response) => response, (error) => {
    if (error.response.status === 401) {
      navigate('/connexion');
    }

    return Promise.reject(error);
  });
};
