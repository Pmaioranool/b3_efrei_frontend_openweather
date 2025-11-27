function toast(message, type = "info", duration = 3000) {
  const toastContainer = document.querySelector("#toast");
  toastContainer.className = `toast ${type} show`;
  toastContainer.innerText = message;
  if (duration === "always") return;
  setTimeout(() => {
    toastContainer.className = "toast";
  }, duration);
}

async function fetchWeatherData(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=fr`
    );

    if (!response.ok) {
      throw new Error("Ville non trouvée");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    toast(error.message, "error");
    return null; // important : permet de tester dans form.submit
  }
}

function showData(data) {
  // afficher les données du temps actuel
  const currentWeather = document.getElementById("currentWeather");
  let description = "";
  data.weather.forEach((element) => {
    description += element.description + ", ";
  });
  // Supprime la dernière virgule et l'espace
  description = description.slice(0, -2);

  currentWeather.children[0].innerText = description;
  currentWeather.children[1].innerHTML = `${Math.round(data.main.temp)} °C`;
  currentWeather.children[2].children[0].innerText = `${data.name}`;
  currentWeather.children[2].children[1].innerText = `, ${data.sys.country}`;

  // afficher les données du temps précis

  const weatherGrid = document.getElementById("weatherGrid");
  weatherGrid.children[0].children[1].innerText = `${data.main.feels_like} °C`;
  weatherGrid.children[1].children[1].innerText = `${data.main.humidity} %`;
  weatherGrid.children[2].children[1].innerText = `${data.main.pressure} hPa`;
  weatherGrid.children[3].children[1].innerText = `${data.wind.speed} m/s`;
  weatherGrid.children[4].children[1].innerText = `${(
    data.visibility / 1000
  ).toFixed(1)} km`;
}

function save(list, item) {
  const oldList = localStorage.getItem(item)
    ? JSON.parse(localStorage.getItem(item))
    : [];

  const ONE_DAY_MS = 24 * 60 * 60 * 1000; // Millisecondes dans un jour

  if (item === "history") {
    // Vérifier si un élément avec le même nom existe à moins d'un jour
    const existsRecent = oldList.find(
      (el) =>
        el.name === list.name &&
        Math.abs(new Date(list.date) - new Date(el.date)) < ONE_DAY_MS
    );
    if (existsRecent) return;
  } else {
    // Vérifier juste par nom pour les autres listes
    if (oldList.find((el) => el.name === list.name)) return;
  }

  // Limiter à 10 éléments
  if (oldList.length >= 10) oldList.pop();

  const newList = [list, ...oldList];
  localStorage.setItem(item, JSON.stringify(newList));
}

import API_KEY from "../env.js";

// Vérification de la clé API
if (
  !API_KEY ||
  API_KEY === undefined ||
  API_KEY === "" ||
  API_KEY === "YOUR_API_KEY"
) {
  toast(
    "clé API non définie. Veuillez définir votre clé API dans env.js",
    "error",
    "always"
  );
  throw new Error(
    "clé API non définie. Veuillez définir votre clé API dans env.js"
  );
}

const form = document.querySelector(".search-container");

form.addEventListener("submit", async (event) => {
  event.preventDefault(); // empêche le rechargement

  const city = document.getElementById("searchInput").value;
  if (!city) {
    toast("Veuillez entrer le nom d'une ville.", "warning");
    return;
  }
  const data = await fetchWeatherData(city);
  if (data) {
    showData(data);
    save(data, "history");
  }
});

const favoriteBtn = document.getElementById("favoriteBtn");
favoriteBtn.addEventListener("click", () => {
  const cityName = document.getElementById("cityName").innerText;

  if (!cityName || cityName === "Ville") {
    toast("Aucune ville à ajouter aux favoris.", "warning");
    return;
  }
  save(cityName, "favorites");
  toast(`${cityName} ajoutée aux favoris !`, "success");
  showFavorites();
});

// Test initial avec une ville par défaut

fetchWeatherData("Paris").then((data) => {
  if (data) {
    showData(data);
  }
});
