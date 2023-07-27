import {
  createAction, createReducer,
} from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '../../utils/redux';
import { axiosInstance } from '../../utils/axios';
import { IAxiosError } from '../../@types/error';
import { handleAxiosErrors, handleReducerErrors } from '../../utils/axiosError';
import {
  IAuthentification,
  UserState,
} from '../../@types/user';

export const initialState: UserState = {
  isRegistered: false,
  isLogged: false,
  token: '',
  userId: 0,
  credentials: {
    firstname: '',
    lastname: '',
    pseudo: '',
    email: '',
    password: '',
    passwordConfirm: '',
  },
  updateCredentials: {
    pseudoUpdate: '',
    emailUpdate: '',
    oldPassword: '',
    password: '',
    passwordConfirm: '',
  },
  errorMessages: '',
  successMessage: '',
};

// Type qui récupère les clé de l'objet du state.updateCredentials
export type KeysOfUpdateCredentials = keyof UserState['updateCredentials'];
// Type qui récupère les clé de l'objet du state.credentials
export type KeysOfCredentials = keyof UserState['credentials'];

// Réinitialisation du state et suppression du token stocké dans le localStorage
function resetState(state : UserState) {
  state.credentials = { ...initialState.credentials };
  state.updateCredentials = { ...initialState.updateCredentials };
  state.isLogged = false;
  state.token = '';
  state.userId = 0;
  state.isRegistered = false;
  state.errorMessages = '';
  state.successMessage = '';
  localStorage.removeItem('token');
}

//* ACTION: met à jour la  valeur des champs des inputs de formulaire logiin/register
// propertyKey: type  du champs field
export const changeCredentialsField = createAction<{
  propertyKey: KeysOfCredentials
  value: string
}>('user/CHANGE_CREDENTIALS_FIELD');

//* ACTION: vide les champs des inputs de formulaire
// par défaut va vider le contenu du state errorMessages
export const clearInputsAndErrors = createAction('user/CLEAR_INPUTS_AND_ERRORS');

//* ACTION: vérifier si l'utilisateur est connecté (si le token existe)
export const checkIsLogged = createAction<boolean>('user/CHECK_IS_LOGGED');

//* ACTION: déconnexion utilisateur
export const logout = createAction('user/LOGOUT');

//* ACTION : met à jour la valeur des champs des inputs de formulaire updateProfil et updatePassword
export const updateProfilField = createAction<{
  propertyUpdate: KeysOfUpdateCredentials
  value: string
}>('user/UPDATE_PROFIL_FIELD');

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
    try {
      // Appel API avec envoie des données du formulaire
      const { data } = await axiosInstance.post('/signup', {
        email, pseudo, firstname, lastname, password, passwordConfirm,
      });
      return data as IAuthentification;
    } catch (error) {
      return handleReducerErrors(error as IAxiosError, thunkAPI);
    }
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
    try {
      // Appel API avec envoie des données du formulaire
      const { data } = await axiosInstance.post('/login', { email, password });
      // Stocke dans le localStorage
      localStorage.setItem('token', JSON.stringify(data.token));
      return data as IAuthentification;
    } catch (error) {
      return handleReducerErrors(error as IAxiosError, thunkAPI);
    }
  },
);

//* ACTION: trouver un utilisateur
// TODO typer l'ation ?
// Back verifie le pseudo stocké dans le token
export const findUser = createAppAsyncThunk(
  'user/FIND_USER',
  async () => {
    // const { data } = await axiosInstance.get('/profile');
    // return data as IAuthentification;
    try {
      // Appel API avec envoie des données du formulaire
      const { data } = await axiosInstance.get('/profile');
      return data as IAuthentification;
    } catch (error) {
      return handleAxiosErrors(error as IAxiosError);
    }
  },
);

// ACTION: mise à jour: email ou pseudo de l'utilisateur
export const update = createAppAsyncThunk(
  'user/UPDATE',
  async (_, thunkAPI) => {
    // récupère l'intégralité du state depuis le store
    const state = thunkAPI.getState();
    // récupère les states qui correspondent aux inputs du formulaire
    const { emailUpdate, pseudoUpdate } = state.user.updateCredentials;
    try {
      // Appel API avec envoi des données du formulaire
      const { data } = await axiosInstance.patch('/profile', { email: emailUpdate, pseudo: pseudoUpdate });
      return data as IAuthentification;
    } catch (error) {
      return handleReducerErrors(error as IAxiosError, thunkAPI);
    }
  },
);

// ACTION: mise à jour du mot de passe utilisateur
export const updatePassword = createAppAsyncThunk(
  'user/UPDATE_PASSWORD',
  async (_, thunkAPI) => {
    // récupère l'intégralité du state depuis le store
    const state = thunkAPI.getState();
    // récupère les states qui correspondent aux inputs du formulaire
    const { oldPassword, password, passwordConfirm } = state.user.updateCredentials;
    try {
      // Appel API avec envoie des données du formulaire
      const { data } = await axiosInstance.patch('/profile', { password, passwordConfirm, oldPassword });
      return data as IAuthentification;
    } catch (error) {
      return handleReducerErrors(error as IAxiosError, thunkAPI);
    }
  },
);

// ACTION: supprimer utilisateur
// TODO feedback user à faire
export const deleteUser = createAppAsyncThunk(
  'user/DELETE',
  async () => {
    try {
    // Appel API pour exécuter la fonction delete
      const { data } = await axiosInstance.delete('/profile');
      // suppression du token stocké dans le localStorage
      localStorage.removeItem('token');
      return data.message as string;
    } catch (error) {
      return handleAxiosErrors(error as IAxiosError);
    }
  },
);

const userReducer = createReducer(initialState, (builder) => {
  builder
    //* addCase changeCredentialsField
    .addCase(changeCredentialsField, (state, action) => {
      // Récupération des valeurs des champs de formulaire
      const { propertyKey, value } = action.payload;
      state.credentials[propertyKey] = value;
      // Réinitialisation des messages d'erreur
      state.errorMessages = '';
    })
    //* addCase clearInputsAndErrors
    .addCase(clearInputsAndErrors, (state) => {
      // Réinitialisation des states (vider les champs du formulaire login/register)
      state.credentials = initialState.credentials;
      state.errorMessages = '';
    })
    //* addCase update (formulaires updateProfil et updatePassword)
    .addCase(updateProfilField, (state, action) => {
      // Récupération des valeurs des champs de formulaire
      const { propertyUpdate, value } = action.payload;
      state.updateCredentials[propertyUpdate] = value;
      // Réinitialisation des messages d'erreur et de succès
      state.errorMessages = '';
      state.successMessage = '';
    })
    //* addCase update
    .addCase(update.fulfilled, (state) => {
      // Mise à jour des state credentials
      state.credentials.email = state.updateCredentials.emailUpdate;
      state.credentials.pseudo = state.updateCredentials.pseudoUpdate;
      // Message de succès
      state.successMessage = 'Votre compte a bien été mis à jour';
    })
    .addCase(update.rejected, (state, action) => {
      const message = action.payload as string;
      state.errorMessages = message;
    })
    //* addCase register
    .addCase(register.fulfilled, (state, action) => {
      const payload = action.payload as IAuthentification;
      state.isRegistered = payload.isRegistered;
      // Réinitialisation des state des mots de passe
      state.credentials.password = '';
      state.credentials.passwordConfirm = '';
    })
    .addCase(register.pending, (state) => {
      state.isRegistered = false;
    })
    .addCase(register.rejected, (state, action) => {
      const message = action.payload as string;
      state.errorMessages = message;
    })

    //* addCase login
    .addCase(login.fulfilled, (state, action) => {
      // Récupère les informations retournées par l'API
      const payload = action.payload as IAuthentification;
      state.isLogged = payload.isLogged;
      state.token = payload.token;
      state.userId = payload.id;
      state.credentials.pseudo = payload.pseudo;
      state.credentials.firstname = payload.firstname;
      state.credentials.lastname = payload.lastname;
      // Réinitialisation du state du mot de passe
      state.credentials.password = '';
      // Réinitialisation
      state.isRegistered = false;
    })
    .addCase(login.rejected, (state, action) => {
      const message = action.payload as string;
      state.errorMessages = message;
    })

    //* addCase checkIsLogged
    .addCase(checkIsLogged, (state, action) => {
      state.isLogged = action.payload;
    })
    //* addCase findUser
    .addCase(findUser.fulfilled, (state, action) => {
      // Récupère les informations retournées par l'API
      const payload = action.payload as IAuthentification;
      state.userId = payload.id;
      state.credentials.pseudo = payload.pseudo;
      state.credentials.email = payload.email;
      state.credentials.firstname = payload.firstname;
      state.credentials.lastname = payload.lastname;
      state.updateCredentials.emailUpdate = payload.email;
      state.updateCredentials.pseudoUpdate = payload.pseudo;
    })
    .addCase(findUser.rejected, (state, action) => {
      const message = action.payload as string;
      state.errorMessages = message;
    })
    //* addCase logout
    .addCase(logout, resetState)
    //* addCase updatePassword
    .addCase(updatePassword.fulfilled, (state) => {
      // Réinitialisation des states
      state.updateCredentials = initialState.updateCredentials;
      // Message de succès
      state.successMessage = 'Votre mot de passe a bien été mis à jour';
    })
    .addCase(updatePassword.rejected, (state, action) => {
      const message = action.payload as string;
      state.errorMessages = message;
    })
    //* addCase deleteUser
    .addCase(deleteUser.fulfilled, (state, action) => {
      resetState(state);
      state.successMessage = action.payload;
    })
    .addCase(deleteUser.rejected, (state, action) => {
      const message = action.payload as string;
      state.errorMessages = message;
    });
});

export default userReducer;
