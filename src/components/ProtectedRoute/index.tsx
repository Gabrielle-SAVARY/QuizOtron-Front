import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';

interface ProtectedRouteProps {
  children: JSX.Element
}

function ProtectedRoute({ children }:ProtectedRouteProps) {
  const isLogged = useAppSelector((state) => state.user.isLogged);
  return isLogged ? children : <Navigate to="/connexion" replace />;
}

export default ProtectedRoute;
