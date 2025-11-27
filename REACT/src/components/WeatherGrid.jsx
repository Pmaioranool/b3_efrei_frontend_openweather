export default function WeatherGrid({ weather }) {
  if (!weather) return null;

  return (
    <section className="weather-grid" id="weatherGrid">
      <div className="weather-item">
        <h3>Ressenti</h3>
        <p id="feelsLike">{weather.feels}°C</p>
      </div>
      <div className="weather-item">
        <h3>Humidité</h3>
        <p id="humidity">{weather.humidity}%</p>
      </div>
      <div className="weather-item">
        <h3>Pression</h3>
        <p id="pressure">{weather.pressure} hPa</p>
      </div>
      <div className="weather-item">
        <h3>Vitesse du Vent</h3>
        <p id="windSpeed">{weather.wind} m/s</p>
      </div>
      <div className="weather-item">
        <h3>Visibilité</h3>
        <p id="visibility">{weather.visibility} km</p>
      </div>
    </section>
  );
}
