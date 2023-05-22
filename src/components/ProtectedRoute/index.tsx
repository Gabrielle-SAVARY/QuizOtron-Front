import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';

interface ProtectedRouteProps {
  children: JSX.Element
}
// Vérifie si un token existe dans el localStorage, si oui accès aux pages
// si non redirection vers formulaire de connexion

function ProtectedRoute({ children }:ProtectedRouteProps) {
  return localStorage.getItem('token') ? children : <Navigate to="/connexion" replace />;
}

export default ProtectedRoute;
