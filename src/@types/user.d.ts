export interface ILogin {
  logged: boolean
  token: string

  credentials: {
    firstname: string
    lastname: string
    pseudo: string;
    email: string;
    password: string;
    passwordConfirm: string;
  },

}

// typage data retournée par requête axios: login
