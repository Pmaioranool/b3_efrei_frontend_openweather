export default function FavoritesList({ favorites = [], onClickS, onClickX }) {
  return (
    <section className="card">
      <h2>Villes Favorites</h2>
      <ul id="favoritesList">
        {favorites.length === 0 ? (
          <li>Aucune ville enregistrée.</li>
        ) : (
          favorites.map((city) => (
            <li key={city.name}>
              {city.name}
              <div>
                <button
                  className="search-favorite-btn"
                  onClick={() => onClickS(city.name)}
                >
                  S
                </button>
                <button
                  className="search-favorite-btn"
                  onClick={() => onClickX(city.name)}
                >
                  X
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
