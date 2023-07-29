import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
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
  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      setErrorMessage('');
    }
  }, [errorMessage, setErrorMessage]);
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      setSuccessMessage('');
    }
  }, [successMessage, setSuccessMessage]);

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
