export interface ILogin {
  logged: boolean
  firstName: string
  lastName: string
  pseudo: string;
  credentials: {
    email: string;
    password: string;
  },
  token: string
}

// typage data retournée par requête axios: login
