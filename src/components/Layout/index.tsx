import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useAppSelector } from '../../hooks/redux';
import Footer from '../Footer';
import Header from '../Header';
import './styles.scss';
import 'react-toastify/dist/ReactToastify.css';

interface LayoutProps {
  errorMessage: string;
  setErrorMessage: (value: string) => void;
  successMessage: string;
  setSuccessMessage: (value: string) => void;
  children: React.ReactNode
}
function Layout({
  errorMessage, setErrorMessage, successMessage, setSuccessMessage, children,
}: LayoutProps) {
  // Récupère le message de succès de la requête backend
  const userSuccessMessage = useAppSelector((state) => state.user.successMessage);
  const userErrorMessage = useAppSelector((state) => state.user.errorMessages);
  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage, {
        position: 'top-center',
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        className: 'toast-message',
      });
      setErrorMessage('');
    }
  }, [errorMessage, setErrorMessage]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        className: 'toast-message',
      });
      setSuccessMessage('');
    }
  }, [successMessage, setSuccessMessage]);

  useEffect(() => {
    if (userSuccessMessage) {
      toast.success(userSuccessMessage, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        className: 'toast-message',
      });
    }
  }, [userSuccessMessage]);

  useEffect(() => {
    if (userErrorMessage) {
      toast.error(userErrorMessage, {
        position: 'top-center',
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        className: 'toast-message',
      });
    }
  }, [userErrorMessage]);

  return (
    <div className="app__container">
      <Header />
      <ToastContainer />
      <div className="app__content">{children}</div>
      <Footer />
    </div>

  );
}

export default Layout;
