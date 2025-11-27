function toast(message, type = "info", duration = 3000) {
  const toastContainer = document.querySelector("#toast");
  toastContainer.className = `toast ${type} show`;
  toastContainer.innerText = message;
  if (duration === "always") return;
  setTimeout(() => {
    toastContainer.className = "toast";
  }, duration);
}

function fetchWeatherData(city) {
  try {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=fr`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ville non trouvée");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // Traitez et affichez les données météo ici
      })
      .catch((error) => {
        toast(error.message, "error");
      });
  } catch (error) {
    toast(
      "Une erreur est survenue lors de la récupération des données.",
      "error",
      5000
    );
  }
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

form.addEventListener("submit", (event) => {
  event.preventDefault(); // empêche le rechargement

  const city = document.getElementById("searchInput").value;
  if (!city) {
    toast("Veuillez entrer le nom d'une ville.", "warning");
    return;
  }
  const data = fetchWeatherData(city);
});
