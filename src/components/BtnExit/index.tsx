import { useNavigate } from 'react-router-dom';
import './styles.scss';
import { FiArrowLeft } from 'react-icons/fi';

interface BtnExitProps {
  redirectionLink: string;
}
function BtnExit({ redirectionLink }: BtnExitProps) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="btn-Exit"
      onClick={() => navigate(redirectionLink)}
    >
      <FiArrowLeft size={20} />
    </button>
  );
}

export default BtnExit;
