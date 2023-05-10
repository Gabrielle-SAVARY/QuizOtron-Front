import { NavLink } from 'react-router-dom';
import Field from './Field';
import './styles.scss';

function Login() {
  return (

    <div className="login">
      <form action="submit" className="login-form">
        <h3>Me connecter</h3>
        <div className="login-form__field__container">
          <Field placeholderLabel="Email" value="" type="text" placeholder="adresse email" />
          <Field placeholderLabel="Mot de passe" value="" type="text" placeholder="mot de passe" />
        </div>
        <button type="submit" className="login-form__button">Connexion</button>
      </form>
      <p>Mot de passe oublié</p>
      <div className="register-redirect">
        <p>Vous n&apos; avez pas encore de compte</p>
        <button type="submit" className="button-register">Inscription</button>
      </div>
    </div>

  );
}

export default Login;
