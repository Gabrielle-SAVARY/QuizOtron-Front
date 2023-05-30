import { createAction, createReducer } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '../../utils/redux';
import { IAuthentification } from '../../@types/user';
import { axiosInstance } from '../../utils/axios';

interface UserState {
  isLogged: boolean;
  token: string;
  isRegistered: boolean
  userId: number

  credentials: {
    firstname: string
    lastname: string
    pseudo: string;
    email: string;
    password: string;
    passwordConfirm: string;
    oldPassword: string,
  }
}

export const initialState: UserState = {
  isLogged: false,
  token: '',
  isRegistered: false,
  userId: 0,

  credentials: {
    firstname: '',
    lastname: '',
    pseudo: '',
    email: '',
    password: '',
    passwordConfirm: '',
    oldPassword: '',
  },
};

//* Type qui récupère les clé de l'objet du state.credentials
export type KeysOfCredentials = keyof UserState['credentials'];

//* ACTION: met à jour la  valeur des champs des inputs de formulaire
// propertyKey: type  du champs field
export const changeCredentialsField = createAction<{
  propertyKey: KeysOfCredentials
  value: string
}>('user/CHANGE_CREDENTIALS_FIELD');

//* ACTION: créer/inscription utilisateur
export const register = createAppAsyncThunk(
  'user/REGISTER',
  async (_, thunkAPI) => {
    // récupère l'intégralité du state depuis le store
    const state = thunkAPI.getState();

    // récupère les states qui correspondent aux inputs du formulaire register
    const {
      email, pseudo, firstname, lastname, password, passwordConfirm,
    } = state.user.credentials;

    // Appel API avec envoie des données du formulaire
    const { data } = await axiosInstance.post('/signup', {
      email, pseudo, firstname, lastname, password, passwordConfirm,
    });

    return data as IAuthentification;
  },
);

//* ACTION: connexion utilisateur
export const login = createAppAsyncThunk(
  'user/LOGIN',
  async (_, thunkAPI) => {
    // récupère l'intégralité du state depuis le store
    const state = thunkAPI.getState();

    // récupère les states qui correspondent aux inputs du formulaire
    const { email, password } = state.user.credentials;

    // Appel API avec envoie des données du formulaire
    const { data } = await axiosInstance.post('/login', { email, password });

    // Stocke dans le localStorage
    localStorage.setItem('token', JSON.stringify(data.token));

    return data as IAuthentification;
  },
);

//* ACTION: vérifier si l'utilisateur est connecté (si le token existe)
export const checkIsLogged = createAction<boolean>('user/CHECK_IS_LOGGED');

//* ACTION: trouver un utilisateur
// TODO typer l'ation ?
// Back verifie le pseudo stocké dans le token
export const findUser = createAppAsyncThunk(
  'user/FIND_USER',
  async () => {
    const { data } = await axiosInstance.get('/profile');
    return data as IAuthentification;
  },
);

//* ACTION: déconnexion utilisateur
export const logout = createAction('user/LOGOUT');

//* ACTION: mise à jour: email ou pseudo de l'utilisateur
export const update = createAppAsyncThunk(
  'user/UPDATE',
  async (_, thunkAPI) => {
    // récupère l'intégralité du state depuis le store
    const state = thunkAPI.getState();

    // récupère les states qui correspondent aux inputs du formulaire
    const { email, pseudo } = state.user.credentials;

    // Appel API avec envoie des données du formulaire
    const { data } = await axiosInstance.patch('/profile/settings/update', { email, pseudo });

    return data as IAuthentification;
  },
);

//* ACTION: mise à jour du mot de passe utilisateur
export const updatePassword = createAppAsyncThunk(
  'user/UPDATE_PASSWORD',
  async (_, thunkAPI) => {
    // récupère l'intégralité du state depuis le store
    const state = thunkAPI.getState();

    // récupère les states qui correspondent aux inputs du formulaire
    const { oldPassword, password, passwordConfirm } = state.user.credentials;

    // Appel API avec envoie des données du formulaire
    const { data } = await axiosInstance.patch('/profile/settings/update', { password, passwordConfirm, oldPassword });

    return data as IAuthentification;
  },
);

//* ACTION: supprimer utilisateur
// TODO feedback user à faire
export const deleteUser = createAppAsyncThunk(
  'user/DELETE',
  async () => {
    // Appel API pour exécuter la fonction delete
    const { data } = await axiosInstance.delete('/profile/settings/delete');
    // suppression du token stocké dans le localStorage
    localStorage.removeItem('token');

    return data as IAuthentification;
  },
);

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCredentialsField, (state, action) => {
      const { propertyKey, value } = action.payload;
      state.credentials[propertyKey] = value;
    })
    .addCase(register.fulfilled, (state, action) => {
      state.isRegistered = action.payload.isRegistered;

      // Je réinitialise les credentials
      state.credentials.password = '';
      state.credentials.passwordConfirm = '';
    })
    .addCase(register.pending, (state) => {
      state.isRegistered = false;
    })
    .addCase(register.rejected, (state) => {
      state.isRegistered = false;
    })
    .addCase(login.fulfilled, (state, action) => {
      // J'enregistre les informations retournées par mon API
      state.isLogged = action.payload.isLogged;
      state.token = action.payload.token;
      state.userId = action.payload.id;
      state.credentials.pseudo = action.payload.pseudo;
      state.credentials.firstname = action.payload.firstname;
      state.credentials.lastname = action.payload.lastname;

      // Je réinitialise les credentials
      state.credentials.password = '';
    })
    .addCase(checkIsLogged, (state, action) => {
      state.isLogged = action.payload;
    })
    .addCase(findUser.fulfilled, (state, action) => {
      state.userId = action.payload.id;
      state.credentials.pseudo = action.payload.pseudo;
      state.credentials.email = action.payload.email;
      state.credentials.firstname = action.payload.firstname;
      state.credentials.lastname = action.payload.lastname;
    })
    .addCase(logout, (state) => {
      state.isLogged = false;
      state.credentials.pseudo = '';
      state.credentials.firstname = '';
      state.credentials.lastname = '';
      state.credentials.email = '';
      state.token = '';
      state.userId = 0;

      // Quand l'utilisateur se déconnecte je supprime les données du localStorage
      localStorage.removeItem('token');
    })
    .addCase(updatePassword.fulfilled, (state) => {
      state.credentials.oldPassword = '';
      state.credentials.password = '';
      state.credentials.passwordConfirm = '';
    })
    .addCase(deleteUser.fulfilled, (state) => {
      // on déconnecte l'utilisateur
      state.isLogged = false;
      // on supprime les informations du state
      state.token = '';
      state.credentials.firstname = '';
      state.credentials.lastname = '';
      state.credentials.email = '';
      state.credentials.pseudo = '';
      state.userId = 0;
    });
});

export default userReducer;
