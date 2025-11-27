import SearchForm from "../components/SearchForm.jsx";

export default function Accueil() {
  return (
    <main class="container">
      {/* RECHERCHE */}
      <SearchForm></SearchForm>

      {/* MÉTÉO ACTUELLE */}
      <section class="card" id="currentWeather">
        <div class="weather-description" id="weatherDesc">
          Chargement...
        </div>
        <div class="current-temp" id="currentTemp">
          --°C
        </div>
        <p>
          <strong id="cityName">Ville</strong>
          <span></span>
        </p>
        <button type="button" id="favoriteBtn">
          Ajouter aux favoris
        </button>
      </section>

      {/* GRILLE DE DÉTAILS */}
      <section class="weather-grid" id="weatherGrid">
        <div class="weather-item">
          <h3>Ressenti</h3>
          <p id="feelsLike">--°C</p>
        </div>
        <div class="weather-item">
          <h3>Humidité</h3>
          <p id="humidity">--%</p>
        </div>
        <div class="weather-item">
          <h3>Pression</h3>
          <p id="pressure">-- hPa</p>
        </div>
        <div class="weather-item">
          <h3>Vitesse du Vent</h3>
          <p id="windSpeed">-- m/s</p>
        </div>
        <div class="weather-item">
          <h3>Visibilité</h3>
          <p id="visibility">-- km</p>
        </div>
      </section>

      <section class="card">
        <h2>Villes Favorites</h2>
        <ul id="favoritesList"></ul>
      </section>
    </main>
  );
}
