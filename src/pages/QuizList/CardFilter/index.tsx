import MovieIcon from '@mui/icons-material/Movie';
import './styles.scss';

interface CardFilterProps {
  cardType: string;
  id: number;
  label: string;
  onClick: (id:number, type:string) => void;
  isFilterInArray: (
    array: { type: string; id: number }[], obj: { type: string; id: number }
  ) => boolean;
  selectedFilters: { type: string; id: number }[];

}

function CardFilter({
  cardType, id, label, onClick, isFilterInArray, selectedFilters,
}: CardFilterProps) {
  // Vérifie si le filtre est déjà présent dans le tableau:
  // si oui, retourne isSelected (cardFilter est sélectionnée)
  const isSelected = isFilterInArray(selectedFilters, { type: cardType, id });
  // Définit la classe CSS du filtre en fonction de isSelected
  const cardClass = isSelected ? 'card-filter card-filter--selected' : 'card-filter';

  return (
    <button type="button" className="cardFilter__btn" onClick={() => onClick(id, 'type')}>
      <div className={`card-${cardType} ${cardType}${id} ${cardClass}`}>
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
