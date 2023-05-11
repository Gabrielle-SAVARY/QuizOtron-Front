import axios from 'axios';
import { createAction, createReducer } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '../../utils/redux';

interface UserState {
  credentials: {
    email: string;
    password: string;
  }
  pseudo: string;
}

export const initialState: UserState = {
  credentials: {
    email: 'elon@gmail.com',
    password: 'test',
  },
  pseudo: '',
};

export const login = createAppAsyncThunk(
  'user/LOGIN',
  async (_, thunkAPI) => {
    // on récupère l'intégralité du state depuis le store
    const state = thunkAPI.getState();

    // Appel API
    const { data } = await axios.post('http://localhost:3000/login', state.user.credentials);
    // on passe en paramètre de la requête les credentials du store
    console.log('data', data);

    return data as { email: string };
  },
);

// Export du type de KeysOfCredentials: prend le contenu de credentials
// `type` permet de créer un type comme `interface`.
// key of: permet de récupérer les clés dun objet de manière dynamique
// MONINTERFACE['propriété'] récupère le type d'une propriété
export type KeysOfCredentials = keyof UserState['credentials'];

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
      state.pseudo = action.payload.pseudo;
    });
});

export default userReducer;
