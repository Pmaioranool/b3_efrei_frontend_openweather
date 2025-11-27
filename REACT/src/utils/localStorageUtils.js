import toast from "react-hot-toast";

export function load(item) {
  return localStorage.getItem(item)
    ? JSON.parse(localStorage.getItem(item))
    : [];
}

export function save(list, item) {
  const oldList = localStorage.getItem(item)
    ? JSON.parse(localStorage.getItem(item))
    : [];

  const ONE_DAY_MS = 60 * 1000; // Millisecondes dans 10 minutes

  if (item === "history") {
    // Vérifier si un élément avec le même nom existe à moins de 10 minutes
    const existsRecent = oldList.find(
      (el) =>
        el.name === list.name &&
        Math.abs(new Date(list.date) - new Date(el.date)) < ONE_DAY_MS
    );
    if (existsRecent) return;
  } else {
    // Vérifier juste par nom pour les autres listes
    if (oldList.find((el) => el.name === list.name)) {
      toast.error(`${list.name} est déjà dans la liste des favoris !`);
      return;
    }
  }

  // Limiter à 10 éléments
  if (oldList.length >= 10) oldList.pop();

  const newList = [list, ...oldList];
  localStorage.setItem(item, JSON.stringify(newList));
  toast.success(`${list.name} ajoutée aux ${item} !`, "success");
}

export function showHistory() {
  const historyList = document.getElementById("historyList");
  const emptyHistory = document.getElementById("emptyHistory");
  const history = load("history");

  historyList.innerHTML = "";

  if (history.length === 0) {
    emptyHistory.style.display = "block";
    historyList.style.display = "none";
    return;
  } else {
    emptyHistory.style.display = "none";
    historyList.style.display = "block";
  }

  history.forEach((entry) => {
    const description = entry.weather.map((w) => w.description).join(", ");

    const li = document.createElement("li");
    li.className = "history-item";
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

  // Boutons de recherche
  document.querySelectorAll(".history-search-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const city = btn.getAttribute("data-city");
      window.location.href = `index.html?city=${encodeURIComponent(city)}`;
    });
  });
}

export function clearHistory() {
  localStorage.removeItem("history");
  toast("Historique effacé", "success");
  showHistory();
}
