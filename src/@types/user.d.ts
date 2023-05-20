export interface IAuthentification {
  isLogged: boolean
  token: string
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

// typage data retournée par requête axios: login
