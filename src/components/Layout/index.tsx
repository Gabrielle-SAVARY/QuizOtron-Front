import Footer from '../Footer';
import Header from '../Header';
import './styles.scss';

interface LayoutProps {
  children: React.ReactNode
}
function Layout({ children }: LayoutProps) {
  return (
    <div className="app__container">
      <Header />
      <div className="app__content">{children}</div>
      <Footer />
    </div>

  );
}

export default Layout;
