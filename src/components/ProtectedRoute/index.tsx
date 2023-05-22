import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';

// TODO ajouter: en cas de refresh de la page si le user est connecté
// TODO renvoi à la dernière page visitée
// TODO voir useLocation

interface ProtectedRouteProps {
  children: JSX.Element
}

function ProtectedRoute({ children }:ProtectedRouteProps) {
/*   const isLogged = useAppSelector((state) => state.user.isLogged); */
  // console.log(children);
  // return isLogged ? children : <Navigate to="/connexion" replace />;
  return localStorage.getItem('token') ? children : <Navigate to="/connexion" replace />;
}

export default ProtectedRoute;
