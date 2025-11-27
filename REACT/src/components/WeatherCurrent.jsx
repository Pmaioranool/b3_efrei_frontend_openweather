export default function WeatherCurrent({ weather, onClick }) {
  if (!weather) {
    return (
      <section className="card">
        <p>Entrez une ville pour commencer.</p>
      </section>
    );
  }
  return (
    <section className="card" id="currentWeather">
      <div className="weather-description" id="weatherDesc">
        {weather.description}
      </div>
      <div className="current-temp" id="currentTemp">
        {weather.temp}°C
      </div>
      <p>
        <strong id="cityName">{weather.name}</strong>, {weather.country}
      </p>
      <button type="button" id="favoriteBtn" onClick={onClick}>
        Ajouter aux favoris
      </button>
    </section>
  );
}
