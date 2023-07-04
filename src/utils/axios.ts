import axios from 'axios';

// enregistrement de la configuration de base de axios
export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',

});

// TODO erreur de type
// ajout du token dans le header (champs Authorization) de chaque requête
axiosInstance.interceptors.request.use((config) => {
  const tokenStorage = localStorage.getItem('token');
  const token = tokenStorage ? JSON.parse(tokenStorage) : null;

  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = token ? `Bearer ${token}` : '';

  return config;
});
