import { NavLink } from 'react-router-dom';
import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { KeysOfCredentials, changeCredentialsField } from '../../store/reducers/user';
import './styles.scss';

function Login() {
  const dispatch = useAppDispatch();
  const email = useAppSelector((state) => state.user.credentials.email);
  const password = useAppSelector((state) => state.user.credentials.password);

  const handleChangeField = (event: ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value;
    // récupère name de l'input et le type la donnée
    const fieldName = event.target.name as KeysOfCredentials;

    dispatch(changeCredentialsField({
      propertyKey: fieldName,
      value: newValue,
    }));
  };

  return (

    <div className="login-page">
      <div className="login-page__wrapper">

        <form action="submit" className="form form-login">
          <div className="form__logo">Quiz&apos;O&apos;tron</div>

          <input type="text" placeholder="Email" className="form__input" value={email} onChange={handleChangeField} name="email" />
          <input type="password" placeholder="Mot de passe" className="form__input" value={password} onChange={handleChangeField} name="password" />
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
