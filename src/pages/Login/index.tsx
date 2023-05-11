import { NavLink } from 'react-router-dom';
import { ChangeEvent, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { KeysOfCredentials, changeCredentialsField, login } from '../../store/reducers/user';
import './styles.scss';

function Login() {
  const dispatch = useAppDispatch();
  const email = useAppSelector((state) => state.user.credentials.email);
  const password = useAppSelector((state) => state.user.credentials.password);
  const pseudo = useAppSelector((state) => state.user.pseudo);

  const handleChangeField = (event: ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value;
    // récupère name de l'input et le type la donnée
    const fieldName = event.target.name as KeysOfCredentials;

    dispatch(changeCredentialsField({
      propertyKey: fieldName,
      value: newValue,
    }));
  };

  const handleLogin = () => {
    dispatch(login());
    console.log('test');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('test2');
    handleLogin();
  };

  return (

    <div className="login-page">
      <div className="login-page__wrapper">

        <form action="submit" className="form form-login" onSubmit={handleSubmit}>
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
