import { NavLink } from 'react-router-dom';

interface LogoProps {
  logoContainerClassName: string;
  logoName: string;
  logoClassName: string;
}

function Logo({ logoName, logoClassName, logoContainerClassName }: LogoProps) {
  return (
    <NavLink to="/">
      <div className={logoContainerClassName}>
        <img src={logoName} alt="logo quizotron" className={logoClassName} />
      </div>
    </NavLink>
  );
}

export default Logo;
