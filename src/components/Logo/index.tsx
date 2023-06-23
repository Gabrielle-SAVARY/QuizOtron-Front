interface LogoProps {
  logoContainerClassName: string;
  logoName: string;
  logoClassName: string;
}

function Logo({ logoName, logoClassName, logoContainerClassName }: LogoProps) {
  return (
    <div className={logoContainerClassName}>
      <img src={logoName} alt="logo quizotron" className={logoClassName} />
    </div>
  );
}

export default Logo;
