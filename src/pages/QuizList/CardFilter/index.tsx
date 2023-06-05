import MovieIcon from '@mui/icons-material/Movie';
import './styles.scss';

interface CardFilterProps {
  id: number;
  label: string;
}

function CardFilter({ id, label }: CardFilterProps) {
  return (
    <div className={`card-category category${id}`}>
      <div className="card-category-header">
        <MovieIcon className="card-category-header__icon" />
      </div>
      <div className="card-category-body">
        <h4 className="card-category-body__title">{label}</h4>
      </div>
    </div>
  );
}

export default CardFilter;
