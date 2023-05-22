import axios from 'axios';
import { getUserDataFromLocalStorage } from './user';

/* const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
} */

// enregistrement de la configuration de base de axios
export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',

});

// ajout du token dans le header (champs Authorization) de chaque requête
axiosInstance.interceptors.request.use((config) => {
  const tokenStorage = localStorage.getItem('token');
  const token = JSON.parse(tokenStorage);

  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = token ? `Bearer ${token}` : null;

  return config;
});
