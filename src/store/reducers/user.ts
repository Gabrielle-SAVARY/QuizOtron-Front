import { createAction, createReducer } from '@reduxjs/toolkit';

interface UserState {
  credentials: {
    email: string;
    password: string;
  }
}

export const initialState: UserState = {
  credentials: {
    email: 'quizotron@gmailcom',
    password: '1234',
  },

};

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
    });
});

export default userReducer;
