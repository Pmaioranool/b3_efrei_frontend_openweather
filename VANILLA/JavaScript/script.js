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
  console.log(data);
  let description = "";
  data.weather.forEach((element) => {
    description += element.description + ", ";
  });
  // Supprime la dernière virgule et l'espace
  description = description.slice(0, -2);

  currentWeather.children[0].innerText = description;
  currentWeather.children[1].innerHTML = `${Math.round(data.main.temp)} °C`;
  currentWeather.children[2].innerText = `${data.name}, ${data.sys.country}`;

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
import API_KEY from "../env.js";

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
  }
});

fetchWeatherData("Paris").then((data) => {
  if (data) {
    showData(data);
  }
});
