import { BsEmojiSmile } from 'react-icons/bs';
import { ITag } from '../../@types/tag';
import './styles.scss';

interface CardHistoryProps {
  cardThumbnail: string;
  cardTitle: string;
  cardTags: ITag[];
  cardLevel: string;
  cardAuthor: string;
  cardScore: number;
}

function CardHistory({
  cardThumbnail, cardTitle, cardTags, cardLevel, cardAuthor, cardScore,
}: CardHistoryProps) {
  return (
    <article className="cardhistory">
      <div className="cardhistory__header">
        <img className="cardhistory__img" src={cardThumbnail} alt={`img ${cardTitle}`} />
      </div>
      <div className="cardhistory__body">
        <h3 className="cardhistory__body__title">{cardTitle}</h3>
        <div className="cardhistory__body__cardTags">
          {cardTags && (
            cardTags.map((tag) => (
              <span key={tag.name} className="cardhistory__body__cardTags-tag">
                {tag.name}
              </span>
            ))
          )}
          <span className="cardhistory__body__cardTags-level">{cardLevel}</span>
        </div>
        <p className="cardhistory__body__author">
          <BsEmojiSmile style={{ fontSize: '24px', color: '#003051' }} />
          {cardAuthor}
        </p>
      </div>
      <div className="cardhistory__footer">
        <span className="cardhistory__footer__score">
          {`${cardScore}/10`}
        </span>
      </div>
    </article>
  );
}

export default CardHistory;
