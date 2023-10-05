import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';

interface ProtectedRouteProps {
  children: JSX.Element
}
// Vérifie l'utilisateur est connecté, si oui accès aux pages
// si non redirection vers formulaire de connexion

function ProtectedRoute({ children }:ProtectedRouteProps) {
  const isLogged = useAppSelector((state) => state.user.isLogged);
  return isLogged ? children : <Navigate to="/connexion" replace />;
}

export default ProtectedRoute;
