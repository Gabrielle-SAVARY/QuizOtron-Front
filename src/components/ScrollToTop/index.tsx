import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Utiliser pour remonter en haut de la page à chaque changement de route

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto', // pas d'animation de scroll
    });
  }, [pathname]);

  return null;
}

export default ScrollToTop;
