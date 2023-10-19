// typage UserState: reducer user
export interface UserState {
  isLogged: boolean;
  isRegistered: boolean
  userId: number
  errorMessages: string
  successMessage: string
  credentials: IUserReducerCredentials
  updateCredentials: IUserReducerUpdateCredentials
}
export interface IUserReducerCredentials {
  firstname: string
  lastname: string
  pseudo: string;
  email: string;
  password: string;
  passwordConfirm: string;
}
export interface IUserReducerUpdateCredentials {
  pseudoUpdate: string;
  emailUpdate: string;
  oldPassword: string,
  password: string;
  passwordConfirm: string;
}

// typage data retournée par requête axios: "/login"
export interface IAuthentification {
  isLogged: boolean
  id: number
  isRegistered: boolean
  firstname: string
  lastname: string
  pseudo: string;
  email: string;
  password: string;
  passwordConfirm: string;
  oldPassword: string;
  newPassword: string;
}

// typage data retournée par requête axios: "/signup"
export interface IRegister {
  isRegistered: boolean
  message: string
}
