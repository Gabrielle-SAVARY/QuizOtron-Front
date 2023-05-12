import axios from 'axios';
import { getUserDataFromLocalStorage } from './user';

const userData = getUserDataFromLocalStorage();

// enregistrement de la configuration de base de axios
export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',

  // ajout du token dans le header (champs Authorization) de chaque requête
  headers: {
    Authorization: userData ? `Bearer ${userData.token}` : null,
  },
});
