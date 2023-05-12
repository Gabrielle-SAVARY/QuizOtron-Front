import axios from 'axios';

// enregistrement de la configuration de base de axios
export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
});
