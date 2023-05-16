import { Route, Routes } from 'react-router-dom';
import Layout from '../Layout';
import Home from '../../pages/Home';
import Quiz from '../../pages/Quiz';
import Login from '../../pages/Login';
import Register from '../../pages/Register';
import Profil from '../../pages/Profil';
import ProtectedRoute from '../ProtectedRoute';

import './styles.scss';

function App() {
  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/quiz/:id"
          element={<Quiz />}
        />
        <Route
          path="/connexion"
          element={<Login />}
        />
        <Route
          path="/inscription"
          element={<Register />}
        />
        <Route
          path="/profile"
          element={(
            <ProtectedRoute>
              <Profil />
            </ProtectedRoute>
          )}
        />
      </Routes>
    </Layout>

  );
}

export default App;
