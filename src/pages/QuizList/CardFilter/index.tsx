import MovieIcon from '@mui/icons-material/Movie';
import './styles.scss';

interface CardFilterProps {
  cardType: string;
  id: number;
  label: string;
  onClick: (id:number) => void;

}

function CardFilter({
  cardType, id, label, onClick,
}: CardFilterProps) {
  return (
    <button type="button" className="cardFilter__btn" onClick={() => onClick(id)}>
      <div className={`card-${cardType} ${cardType}${id}`}>
        <div className={`card-${cardType}-header`}>
          <MovieIcon className={`card-${cardType}-header__icon`} />
        </div>
        <div className={`card-${cardType}-body`}>
          <h4 className={`card-${cardType}-body__title`}>{label}</h4>
        </div>
      </div>
    </button>
  );
}

export default CardFilter;
