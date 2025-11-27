import { toast } from "./toast.js";

function load(item) {
  return localStorage.getItem(item)
    ? JSON.parse(localStorage.getItem(item))
    : [];
}

function showHistory() {
  const historyList = document.getElementById("historyList");
  const emptyHistory = document.getElementById("emptyHistory");
  const history = load("history");

  // Vider la liste actuelle
  historyList.innerHTML = "";

  // Afficher ou masquer l'état vide
  if (history.length === 0) {
    emptyHistory.style.display = "block";
    historyList.style.display = "none";
    return;
  } else {
    emptyHistory.style.display = "none";
    historyList.style.display = "block";
  }

  // Afficher chaque entrée d'historique
  history.forEach((entry) => {
    let description = "";
    entry.weather.forEach((element) => {
      description += element.description + ", ";
    });
    // Supprime la dernière virgule et l'espace
    description = description.slice(0, -2);

    const li = document.createElement("li");
    li.innerHTML = `
      <div class="history-item-main">
        <div class="history-city">${entry.name}</div>
        <div class="history-date">${new Date(entry.date).toLocaleString()}</div>
      </div>
      <div class="history-item-details">
        <div class="history-temp">${Math.round(entry.main.temp)}°C</div>
        <div class="history-desc">${description}</div>
      </div>
      <button class="history-search-btn" data-city="${entry.name}">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>
    `;
    historyList.appendChild(li);
  });

  // Ajouter les écouteurs d'événements pour les boutons de recherche
  document.querySelectorAll(".history-search-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const city = button.getAttribute("data-city");
      window.location.href = `index.html?city=${encodeURIComponent(city)}`;
    });
  });
}

function clearHistory() {
  localStorage.removeItem("history");
  toast("Historique effacé", "success");
  showHistory();
}

// Initialisation
document.addEventListener("DOMContentLoaded", () => {
  showHistory();

  const clearButton = document.getElementById("clearHistory");
  if (clearButton) {
    clearButton.addEventListener("click", clearHistory);
  }
});
