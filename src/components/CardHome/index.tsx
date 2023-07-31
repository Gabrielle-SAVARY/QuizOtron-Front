import { Link } from 'react-router-dom';
import './styles.scss';

interface CardHomeProps {
  redirectLink: string;
  thumbnail: string;
  imgAlt: string;
  title: string;
  content: string;
}

function CardHome({
  redirectLink, thumbnail, imgAlt, title, content,
}: CardHomeProps) {
  return (
    <Link to={redirectLink}>
      <div className="home__card">
        <div className="home__card__header">
          <img className="home__cards__card__header-img" src={thumbnail} alt={imgAlt} />
        </div>
        <div className="home__card__content">
          <p className="home__card__content-title">{title}</p>
          <p className="home__card__content-text">{content}</p>
        </div>
      </div>
    </Link>
  );
}

export default CardHome;
