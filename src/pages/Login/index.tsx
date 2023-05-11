import { NavLink } from 'react-router-dom';
import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import './styles.scss';

function Login() {
  const dispatch = useAppDispatch();
  const pseudo = useAppSelector((state) => state.user.credentials.pseudo);
  const password = useAppSelector((state) => state.user.credentials.password);

  // const handleChangeField = (event: ChangeEvent<HTMLInputElement>): void {
  //   const newValue = event.target.value;

  // };

  return (

    <div className="login-page">
      <div className="login-page__wrapper">

        <form action="submit" className="form form-login">
          <div className="form__logo">Quiz&apos;O&apos;tron</div>

          <input type="text" placeholder="Pseudo" className="form__input" value={pseudo} />
          <input type="password" placeholder="Mot de passe" className="form__input" value={password} />
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
