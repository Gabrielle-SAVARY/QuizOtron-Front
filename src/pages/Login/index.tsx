import { NavLink } from 'react-router-dom';
import './styles.scss';

function Login() {
  return (

    <div className="login-page">
      <div className="login-page__wrapper">

        <form action="submit" className="form form-login">
          <div className="form__logo">Quiz&apos;O&apos;tron</div>
          <input type="text" placeholder="Pseudo" className="form__input" />
          <input type="password" placeholder="Mot de passe" className="form__input" />
          <button type="submit" className="form__button">Connexion</button>
          <p className="form__message">
            Pas encore de compte?
            <NavLink to="/inscription" className="form__inscription">Inscription</NavLink>
          </p>
        </form>
      </div>
    </div>

  );
}

export default Login;
