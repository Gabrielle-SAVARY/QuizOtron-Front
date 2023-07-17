import {useNavigate } from 'react-router-dom';
import './styles.scss';
import { FiArrowLeft } from 'react-icons/fi';

function BtnExit() {  
  const navigate = useNavigate();
  return (
    <button type="button" className='btn-Exit'
    onClick={() => navigate(-1)}
    >
    <FiArrowLeft size={20}/>
    </button>
  );
}

export default BtnExit;
