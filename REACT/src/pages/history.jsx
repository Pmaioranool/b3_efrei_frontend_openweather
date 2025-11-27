export default function History() {
  return (
    <main class="container">
      <section class="card">
        <div class="history-header">
          <h2>Historique des Recherches</h2>
          <button id="clearHistory" class="clear-btn">
            Effacer l'historique
          </button>
        </div>

        <div class="history-content">
          <div id="emptyHistory" class="empty-state">
            <p>Aucune recherche dans l'historique</p>
          </div>
          <ul id="historyList" class="history-list"></ul>
        </div>
      </section>
    </main>
  );
}
