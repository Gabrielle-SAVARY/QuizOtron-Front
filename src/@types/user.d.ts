// typage UserState: reducer user
interface UserState {
  isLogged: boolean;
  token: string;
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
  token: string
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


