import { Link } from 'react-router-dom';
import './styles.scss';
import { FiArrowLeft } from 'react-icons/fi';

interface BtnExitProps {
  redirectionLink: string; 
}

function BtnExit({ redirectionLink}: BtnExitProps) {  
  return (
    <Link to={redirectionLink}>
          <button type="button" className='btn-Exit' title='Page précédente'>
          <FiArrowLeft size={20} />
          </button>
    </Link>
  );
}

export default BtnExit;
