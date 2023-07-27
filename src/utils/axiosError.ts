import axios from "axios";
import { dataError } from "../@types/error";

export interface CustomAxiosError extends Error {
  response?: {
    data: dataError;
  };
}

interface IThunkApi {
  rejectWithValue: (textValu: string) => any;
}

// Fonction pour gérer les erreurs des requêtes axios du reducer
export const handleReducerErrors = (error: CustomAxiosError, thunkAPI: IThunkApi) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      const dataError = error.response.data;
      return thunkAPI.rejectWithValue(dataError);
    }
  } 
  return thunkAPI.rejectWithValue("Un problème sur le serveur est survenu, merci de contacter le service technique.");
}

// Fonction pour gérer les erreurs des requêtes axios
export const handleAxiosErrors = (error: CustomAxiosError) => {
  let newErrorMsg = "Un problème sur le serveur est survenu, merci de contacter le service technique."
  if (axios.isAxiosError(error)) {
    if (error.response) {
       newErrorMsg = error.response.data.message;
    }
  } 
  return newErrorMsg;
}
