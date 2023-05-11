import { Route, Routes } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';
import Home from '../../pages/Home';
import Quiz from '../../pages/Quiz';
import Login from '../../pages/Login';
import Register from '../../pages/Register';
import Profil from '../../pages/Profil';

import './index.scss';

function App() {
  return (

    <div className="app">
      <Header />
      <div>CONTENT</div>

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
          element={<Profil />}
        />

      </Routes>
      <Footer />
    </div>

  );
}

export default App;
