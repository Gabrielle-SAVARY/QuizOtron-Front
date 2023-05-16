import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';

interface ProtectedRouteProps {
  children: JSX.Element
}

function ProtectedRoute({ children }:ProtectedRouteProps) {
  const logged = useAppSelector((state) => state.user.logged);
  return logged ? children : <Navigate to="/connexion" replace />;
}

export default ProtectedRoute;
