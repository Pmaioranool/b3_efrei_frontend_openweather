import SearchForm from "../components/SearchForm";
import WeatherCurrent from "../components/WeatherCurrent";
import WeatherGrid from "../components/WeatherGrid";
import FavoritesList from "../components/FavoritesList";
import { useEffect, useState } from "react";
import { fetchWeatherData, fetchWeatherDataByCity } from "../api/weather.js";
import toast from "react-hot-toast";
import { load, save } from "../utils/localStorageUtils.js";

export default function Accueil() {
  const [weather, setWeather] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(load("favorites"));
  }, []);
  // Fonction appelée depuis SearchForm
  async function handleCitySearch(city) {
    const data = await fetchWeatherDataByCity(city);

    if (data) {
      setWeather({
        name: data.name,
        temp: Math.round(data.main.temp),
        feels: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        wind: data.wind.speed,
        visibility: data.visibility / 1000, // km
        description: data.weather[0].description,
      });
    }

    save({ date: new Date(), ...data }, "history");
  }

  const handleGeoLocation = () => {
    if (!navigator.geolocation) {
      console.error(
        "La géolocalisation n'est pas supportée par ce navigateur."
      );
      return;
    }

    toast.loading("Obtention de la position...");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        toast.dismiss();
        const { latitude, longitude } = position.coords;
        fetchWeatherData(latitude, longitude).then((data) => {
          if (data) {
            setWeather({
              name: data.name,
              country: data.sys.country,
              temp: Math.round(data.main.temp),
              feels: Math.round(data.main.feels_like),
              humidity: data.main.humidity,
              pressure: data.main.pressure,
              wind: data.wind.speed,
              visibility: data.visibility / 1000, // km
              description: data.weather[0].description,
            });
          }
          save({ date: new Date(), ...data }, "history");
        });
      },
      (error) => {
        console.error("Erreur de géolocalisation :", error);
      }
    );
  };

  function handleFavorite() {
    save({ name: weather.name }, "favorites");
    setFavorites(load("favorites"));
  }

  function handleSuppFav(cityName) {
    const favorite = favorites.filter((city) => city.name !== cityName);
    localStorage.setItem("favorites", JSON.stringify(favorite));
    setFavorites(load("favorites"));
    toast.success(`${cityName} supprimée des favoris !`, "info");
  }

  return (
    <main className="container">
      <SearchForm onSearch={handleCitySearch} onLocation={handleGeoLocation} />
      <WeatherCurrent weather={weather} onClick={handleFavorite} />
      <WeatherGrid weather={weather} />
      <FavoritesList
        favorites={favorites}
        onClickS={handleCitySearch}
        onClickX={handleSuppFav}
      />
    </main>
  );
}
