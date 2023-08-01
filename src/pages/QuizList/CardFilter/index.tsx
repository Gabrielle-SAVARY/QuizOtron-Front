import MovieIcon from '@mui/icons-material/Movie';
import { GiSecretBook } from 'react-icons/gi';
import { BsGlobeAmericas } from 'react-icons/bs';
import { BiCameraMovie } from 'react-icons/bi';
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

  //* Change l'icône en fonction du label
  function getIconByLabel(iconLabel: string) {
    switch (iconLabel) {
      case 'histoire':
        return GiSecretBook;
      case 'géographie':
        return BsGlobeAmericas;
      case 'cinéma':
        return BiCameraMovie;
      default:
        return null;
    }
  }
  const Icon = getIconByLabel(label);

  return (
    <button type="button" className="cardFilter" onClick={() => onClick(id, 'type')}>
      <div className={`card-${cardType} ${cardType}${id} ${cardClass}`}>
        <div className={`card-${cardType}-header`}>
          {Icon && <Icon size="40px" className={`card-${cardType}-header__icon`} />}
        </div>
        <div className={`card-${cardType}-body`}>
          <h4 className={`card-${cardType}-body__title`}>{label}</h4>
        </div>
      </div>
    </button>
  );
}

export default CardFilter;
