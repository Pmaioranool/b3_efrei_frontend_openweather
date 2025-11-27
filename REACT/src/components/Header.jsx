import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <h1>OpenWeather</h1>
      <nav>
        <Link to="/">Accueil</Link>
        <Link to="/history">Historique</Link>
      </nav>
    </header>
  );
}
