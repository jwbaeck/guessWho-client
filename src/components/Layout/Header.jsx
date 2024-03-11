import GuessWhoLogo from "../../assets/guessWho_logo.png";

function Header() {
  return (
    <header className="bg-black flex items-center justify-center h-20">
      <img src={GuessWhoLogo} alt="Guess Who Logo" />
    </header>
  );
}

export default Header;
