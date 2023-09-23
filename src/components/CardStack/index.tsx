import './styles.scss';

interface CardStackProps {
  thumbnail: string;
  imgAlt: string;
  title: string;
}

function CardStack({ thumbnail, imgAlt, title }: CardStackProps) {
  return (

    <div className="stack__card">
      <div className="stack__card__header">
        <img className="stack__card__header-img" src={thumbnail} alt={imgAlt} />
      </div>
      <div className="stack__card__content">
        <p className="stack__card__content-title">{title}</p>
      </div>
    </div>

  );
}

export default CardStack;
