import { GiSecretBook } from 'react-icons/gi';
import { BsGlobeAmericas } from 'react-icons/bs';
import { BiCameraMovie } from 'react-icons/bi';
import './styles.scss';

interface BtnFilterProps {
  filterType: string;
  id: number;
  label: string;
  onClick: (id:number, type:string) => void;
  isFilterInArray: (
    array: { type: string; id: number }[], obj: { type: string; id: number }
  ) => boolean;
  selectedFilters: { type: string; id: number }[];

}

function BtnFilter({
  filterType, id, label, onClick, isFilterInArray, selectedFilters,
}: BtnFilterProps) {
  // Vérifie si le filtre est déjà présent dans le tableau:
  // si oui, retourne isSelected (cardFilter est sélectionnée)
  const isSelected = isFilterInArray(selectedFilters, { type: filterType, id });
  // Définit la classe CSS du filtre en fonction de isSelected
  const filterClass = isSelected ? `btn-filter ${filterType}-filter ${filterType}-filter--selected` : `btn-filter ${filterType}-filter`;

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
    <button type="button" className={`${filterClass}`} onClick={() => onClick(id, filterType)}>
      <div className={`btn-${filterType}-${id}`}>
        { filterType === 'tag' && (
        <div className={`btn-${filterType}-header`}>
          {Icon && <Icon size="40px" className={`btn-${filterType}-header__icon`} />}
        </div>
        )}
        <div className={`btn-${filterType}-body`}>
          <h4 className={`btn-${filterType}-body__title`}>{label}</h4>
        </div>
      </div>
    </button>
  );
}

export default BtnFilter;
