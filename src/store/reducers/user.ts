import { createAction, createReducer } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '../../utils/redux';
import { IAuthentification } from '../../@types/user';
import { axiosInstance } from '../../utils/axios';
import { getUserDataFromLocalStorage, removeUserDataFromLocalStorage } from '../../utils/user';

interface UserState {
  logged: boolean;
  token: string;
  registered: boolean

  credentials: {
    firstname: string
    lastname: string
    pseudo: string;
    email: string;
    password: string;
    passwordConfirm: string;
  }
}
// récupération des données du user dans le localStorage
const userData = getUserDataFromLocalStorage();

export const initialState: UserState = {
  logged: false,
  token: '',
  registered: false,
  credentials: {
    firstname: 'Elon',
    lastname: 'Musk',
    pseudo: 'elon-musk',
    email: 'elon@gmail.com',
    password: 'test',
    passwordConfirm: 'test',
  },
  ...userData,
};

export const deleteUser = createAppAsyncThunk(
  'user/DELETE',
  async (_, thunkAPI) => {
    // on récupère l'intégralité du state depuis le store
    /*     const state = thunkAPI.getState();
    const { pseudo } = state.user.credentials; */

    // Appel API
    const { data } = await axiosInstance.delete('/profile/settings/delete');

    // on passe en paramètre de la requête les credentials du store
    console.log('data', data);

    localStorage.removeItem('user');

    return data as IAuthentification;
  },
);

export const register = createAppAsyncThunk(
  'user/REGISTER',
  async (_, thunkAPI) => {
    // on récupère l'intégralité du state depuis le store
    const state = thunkAPI.getState();

    // Appel API
    const { data } = await axiosInstance.post('/signup', state.user.credentials);
    // on passe en paramètre de la requête les credentials du store
    console.log('data', data);

    return data as IAuthentification;
  },
);

export const login = createAppAsyncThunk(
  'user/LOGIN',
  async (_, thunkAPI) => {
    // on récupère l'intégralité du state depuis le store
    const state = thunkAPI.getState();

    const { email, password } = state.user.credentials;
    // Appel API
    const { data } = await axiosInstance.post('/login', { email, password });
    // on passe en paramètre de la requête les credentials du store
    console.log('data LOGIN', data);

    // Stockage des data de  user (en chaine de caractères) dans le localStorage
    localStorage.setItem('user', JSON.stringify(data));

    return data as IAuthentification;
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

export const logout = createAction('user/LOGOUT');

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCredentialsField, (state, action) => {
      const { propertyKey, value } = action.payload;
      state.credentials[propertyKey] = value;
    })
    .addCase(login.fulfilled, (state, action) => {
      // J'enregistre les informations retournées par mon API
      state.logged = action.payload.logged;
      state.token = action.payload.token;
      state.credentials.pseudo = action.payload.pseudo;

      // Je réinitialise les credentials
      state.credentials.email = '';
      state.credentials.password = '';
    })
    .addCase(logout, (state) => {
      state.logged = false;
      state.credentials.pseudo = '';
      state.token = '';

      // Quand l'utilisateur se déconnecte je supprime les données du localStorage
      removeUserDataFromLocalStorage();
    })
    .addCase(register.fulfilled, (state, action) => {
      // J'enregistre les informations retournées par mon API
      state.credentials.firstname = action.payload.firstname;
      state.credentials.lastname = action.payload.lastname;
      state.credentials.email = action.payload.email;
      state.credentials.password = action.payload.password;
      state.credentials.passwordConfirm = action.payload.passwordConfirm;
      state.credentials.pseudo = action.payload.pseudo;

      state.registered = action.payload.registered;

      // Je réinitialise les credentials
      state.credentials.firstname = '';
      state.credentials.lastname = '';
      state.credentials.pseudo = '';
      state.credentials.email = '';
      state.credentials.password = '';
    })
    .addCase(register.pending, (state) => {
      state.registered = false;
    })
    .addCase(register.rejected, (state) => {
      state.registered = false;
    })
    .addCase(deleteUser.fulfilled, (state) => {
      console.log('req.userData', userData);
      state.logged = false;
      state.token = '';
      state.credentials.pseudo = '';

      /*       removeUserDataFromLocalStorage(); */
    });
});

export default userReducer;
