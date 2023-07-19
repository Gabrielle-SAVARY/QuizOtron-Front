import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: JSX.Element
}
// Vérifie si un token existe dans le localStorage, si oui accès aux pages
// si non redirection vers formulaire de connexion

function ProtectedRoute({ children }:ProtectedRouteProps) {
  return localStorage.getItem('token') ? children : <Navigate to="/connexion" replace />;
}

export default ProtectedRoute;
