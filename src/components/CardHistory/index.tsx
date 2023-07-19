import './styles.scss';

interface CardHistoryProps {
  cardThumbnail: string;
  cardTitle: string;
  cardScore: number;
}

function CardHistory({
  cardThumbnail, cardTitle, cardScore,
}: CardHistoryProps) {
  return (

    <article className="cardhistory">
      <div className="cardhistory__header">
        <img className="cardhistory__img" src={cardThumbnail} alt={`img ${cardTitle}`} />
      </div>
      <div className="cardhistory__body">
        <h3 className="cardhistory__title">{cardTitle}</h3>
      </div>
      <div className="cardhistory__footer">
        <p className="cardhistory__score">{cardScore}</p>
      </div>
    </article>

  );
}

export default CardHistory;
