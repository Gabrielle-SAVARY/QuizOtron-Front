export interface IAuthentification {
  logged: boolean
  token: string
  registered: boolean
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
