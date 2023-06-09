import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';
import App from './components/App';
import ScrollToTop from './components/ScrollToTop';
import store from './store';
import './styles/index.scss';

// Je créer un root pour mon application (a partir d'un élément HTML)
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// On injecte notre application dans le DOM
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <StrictMode>
        <ScrollToTop />
        <App />
      </StrictMode>
    </BrowserRouter>
  </Provider>
  ,
);
