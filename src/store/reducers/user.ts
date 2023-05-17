import { createAction, createReducer } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '../../utils/redux';
import { IAuthentification } from '../../@types/user';
import { axiosInstance } from '../../utils/axios';
import { getUserDataFromLocalStorage, removeUserDataFromLocalStorage } from '../../utils/user';

interface UserState {
  logged: boolean;
  token: string;
  registered: boolean
  oldPassword: string,
  newPassword: string,

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
/* const userData = getUserDataFromLocalStorage(); */

export const initialState: UserState = {
  logged: false,
  token: '',
  registered: false,
  oldPassword: '',
  newPassword: '',
  credentials: {
    firstname: 'Elon',
    lastname: 'Musk',
    pseudo: 'elon-musk',
    email: 'elon@gmail.com',
    password: 'test',
    passwordConfirm: 'test',

  },
/*   ...userData, */
};

export const deleteUser = createAppAsyncThunk(
  'user/DELETE',
  async (_, thunkAPI) => {
    // on récupère l'intégralité du state depuis le store
    const state = thunkAPI.getState();
    const { pseudo } = state.user.credentials;
    console.log('pseudo', pseudo);

    // Appel API
    const { data } = await axiosInstance.delete('/profile/settings/delete', pseudo);

    // on passe en paramètre de la requête les credentials du store
    console.log('user', data);

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

export const update = createAppAsyncThunk(
  'user/UPDATE',
  async (_, thunkAPI) => {
    // on récupère l'intégralité du state depuis le store
    const state = thunkAPI.getState();
    const { email, pseudo, password } = state.user.credentials;
    const { oldPassword, newPassword } = state.user;
    // Appel API
    const { data } = await axiosInstance.patch('/profile/settings/update', {
      email, pseudo, password, oldPassword, newPassword,
    });
    // on passe en paramètre de la requête les credentials du store

    return data as IAuthentification;
  },
);

export const login = createAppAsyncThunk(
  'user/LOGIN',
  async (_, thunkAPI) => {
    // on récupère l'intégralité du state depuis le store
    const state = thunkAPI.getState();
    console.log('state', state);

    const { email, password } = state.user.credentials;
    // Appel API
    const { data } = await axiosInstance.post('/login', { email, password });
    // on passe en paramètre de la requête les credentials du store
    console.log('data LOGIN', data);

    // Stockage des data de  user (en chaine de caractères) dans le localStorage
    localStorage.setItem('token', JSON.stringify(data.token));

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

export const changePasswordField = createAction<{
  propertyName: 'oldPassword' | 'newPassword'
  value: string
}>('user/CHANGE_PASSWORD_FIELD');

export const logout = createAction('user/LOGOUT');

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCredentialsField, (state, action) => {
      const { propertyKey, value } = action.payload;
      state.credentials[propertyKey] = value;
    })
    .addCase(changePasswordField, (state, action) => {
      const { propertyName, value } = action.payload;
      state[propertyName] = value;
    })
    .addCase(login.fulfilled, (state, action) => {
      // J'enregistre les informations retournées par mon API
      state.logged = action.payload.logged;
      state.token = action.payload.token;
      state.credentials.pseudo = action.payload.pseudo;
      state.credentials.firstname = action.payload.firstname;
      state.credentials.lastname = action.payload.lastname;

      // Je réinitialise les credentials
      state.credentials.password = '';
    })
    .addCase(logout, (state) => {
      state.logged = false;
      state.credentials.pseudo = '';
      state.token = '';

      // Quand l'utilisateur se déconnecte je supprime les données du localStorage
      localStorage.removeItem('token');
    })
    .addCase(register.fulfilled, (state, action) => {
      state.registered = action.payload.registered;

      // Je réinitialise les credentials
      /*       state.credentials.firstname = '';
      state.credentials.lastname = '';
      state.credentials.pseudo = '';
      state.credentials.email = '';
      state.credentials.password = ''; */
    })
    .addCase(register.pending, (state) => {
      state.registered = false;
    })
    .addCase(register.rejected, (state) => {
      state.registered = false;
    })
    .addCase(deleteUser.fulfilled, (state) => {
      /*      console.log('req.userData', userData); */
      state.logged = false;
      state.token = '';
      state.credentials.firstname = '';
      state.credentials.lastname = '';
      state.credentials.email = '';
      state.credentials.pseudo = '';
      localStorage.removeItem('token');
    })
    .addCase(update.fulfilled, (state) => {
      state.oldPassword = state.credentials.password;
      state.newPassword = '';
    });
});

export default userReducer;
