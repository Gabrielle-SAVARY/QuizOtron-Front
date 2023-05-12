import axios from 'axios';

import { createAction, createReducer } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '../../utils/redux';
import { ILogin } from '../../@types/user';
import { axiosInstance } from '../../utils/axios';

interface UserState {
  logged: boolean;
  pseudo: string;
  token: string;
  credentials: {
    email: string;
    password: string;
  }
}

export const initialState: UserState = {
  logged: false,
  token: '',
  pseudo: '',
  credentials: {
    email: 'elon@gmail.com',
    password: 'test',
  },
};

export const login = createAppAsyncThunk(
  'user/LOGIN',
  async (_, thunkAPI) => {
    // on récupère l'intégralité du state depuis le store
    const state = thunkAPI.getState();

    // Appel API
    const { data } = await axiosInstance.post('/login', state.user.credentials);
    // on passe en paramètre de la requête les credentials du store
    console.log('data', data);

    axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.token}`;

    return data as ILogin;
  },
);

// Export du type de KeysOfCredentials: prend le contenu de credentials
// `type` permet de créer un type comme `interface`.
// key of: permet de récupérer les clés dun objet de manière dynamique
// MONINTERFACE['propriété'] récupère le type d'une propriété
export type KeysOfCredentials = keyof UserState['credentials'];

export const logout = createAction('user/LOGOUT');

// Action: changer le champ de l'input d'un formulaire
// propertyKey: type  du champs field
export const changeCredentialsField = createAction<{
  propertyKey: KeysOfCredentials
  value: string
}>('user/CHANGE_CREDENTIALS_FIELD');

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCredentialsField, (state, action) => {
      state.credentials[action.payload.propertyKey] = action.payload.value;
    })
    .addCase(login.fulfilled, (state, action) => {
      // J'enregistre les informations retournées par mon API
      state.logged = action.payload.logged;
      state.pseudo = action.payload.pseudo;
      state.token = action.payload.token;

      // Je réinitialise les credentials
      state.credentials.email = '';
      state.credentials.password = '';
    })
    .addCase(logout, (state) => {
      state.logged = false;
      state.pseudo = '';
      state.token = '';
    });
});

export default userReducer;
