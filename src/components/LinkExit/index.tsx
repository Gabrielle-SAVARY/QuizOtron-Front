import { Link, useNavigate } from 'react-router-dom';
import './styles.scss';
import { FiArrowLeft } from 'react-icons/fi';

interface LinkExitProps {
  redirectionLink: string;
}
function LinkExit({ redirectionLink }: LinkExitProps) {
  return (
    <Link to={redirectionLink} className="link-exit">
      <FiArrowLeft size={20} />
    </Link>
  );
}

export default LinkExit;
