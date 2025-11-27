// components/History.jsx
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  function loadHistory() {
    try {
      const storedHistory = localStorage.getItem("history")
        ? JSON.parse(localStorage.getItem("history"))
        : [];

      // Nettoyer les entrées invalides
      const validHistory = storedHistory.filter(
        (entry) =>
          entry &&
          entry.name &&
          entry.main &&
          entry.weather &&
          Array.isArray(entry.weather)
      );

      setHistory(validHistory);
    } catch (error) {
      console.error("Erreur lors du chargement de l'historique:", error);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  }

  function clearHistory() {
    localStorage.removeItem("history");
    setHistory([]);
    toast.success("Historique effacé");
  }

  function handleSearch(city) {
    window.location.href = `/?city=${encodeURIComponent(city)}`;
  }

  // Fonction pour obtenir la description météo en toute sécurité
  function getWeatherDescription(entry) {
    if (!entry.weather || !Array.isArray(entry.weather)) {
      return "Données météo non disponibles";
    }

    return (
      entry.weather
        .map((element) => element?.description || "Inconnu")
        .filter((desc) => desc !== "Inconnu")
        .join(", ") || "Description non disponible"
    );
  }

  // Fonction pour obtenir la température en toute sécurité
  function getTemperature(entry) {
    if (!entry.main || typeof entry.main.temp !== "number") {
      return "N/A";
    }
    return Math.round(entry.main.temp);
  }

  if (loading) {
    return (
      <main className="container">
        <section className="card">
          <div className="history-header">
            <h2>Historique des Recherches</h2>
          </div>
          <div className="history-content">
            <div className="empty-state">
              <p>Chargement...</p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (history.length === 0) {
    return (
      <main className="container">
        <section className="card">
          <div className="history-header">
            <h2>Historique des Recherches</h2>
          </div>
          <div className="history-content">
            <div className="empty-state">
              <p>Aucune recherche dans l'historique</p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="container">
      <section className="card">
        <div className="history-header">
          <h2>Historique des Recherches</h2>
          <button onClick={clearHistory} className="clear-btn">
            Effacer l'historique
          </button>
        </div>

        <div className="history-content">
          <ul className="history-list">
            {history.map((entry, index) => {
              const description = getWeatherDescription(entry);
              const temperature = getTemperature(entry);
              const cityName = entry.name || "Ville inconnue";

              // Gestion sécurisée de la date
              let displayDate = "Date inconnue";
              try {
                if (entry.date) {
                  displayDate = new Date(entry.date).toLocaleString();
                }
              } catch (error) {
                console.error("Erreur de format de date:", error);
              }

              return (
                <li key={`${cityName}-${index}`} className="history-item">
                  <div className="history-item-main">
                    <div className="history-city">{cityName}</div>
                    <div className="history-date">{displayDate}</div>
                  </div>
                  <div className="history-item-details">
                    <div className="history-temp">{temperature}°C</div>
                    <div className="history-desc">{description}</div>
                  </div>
                  <button
                    className="history-search-btn"
                    onClick={() => handleSearch(cityName)}
                    title={`Rechercher ${cityName}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </main>
  );
}
