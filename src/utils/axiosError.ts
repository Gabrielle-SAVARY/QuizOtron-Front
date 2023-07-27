import axios from 'axios';
import { IAxiosError } from '../@types/error';

interface IThunkApi {
  rejectWithValue: (textValu: string) => any;
}

// Fonction pour gérer les erreurs des requêtes axios du reducer
export const handleReducerErrors = (error: IAxiosError, thunkAPI: IThunkApi) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      const newError = error.response.data;
      return thunkAPI.rejectWithValue(newError);
    }
  }
  return thunkAPI.rejectWithValue('Un problème sur le serveur est survenu, merci de contacter le service technique.');
};

// Fonction pour gérer les erreurs des requêtes axios
export const handleAxiosErrors = (error: IAxiosError) => {
  let newErrorMsg = 'Un problème sur le serveur est survenu, merci de contacter le service technique.';
  if (axios.isAxiosError(error)) {
    if (error.response) {
      const detailsError = error as IAxiosError;
      newErrorMsg = detailsError.response.data.message;
    }
  }
  return newErrorMsg;
};
