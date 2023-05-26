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
