import Input from "./Input.jsx";
import Button from "./Button.jsx";

export default function SearchForm() {
  const updValue = (e) => {
    console.log(e.target.value);
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="search-container card"
    >
      <Input
        type="search"
        id="searchInput"
        placeholder="Entrez une ville..."
        ariaLabel="Rechercher une ville"
        onChange={updValue}
      />

      <Button
        type="submit"
        id="searchButton"
        onClick={(e) => console.log(e.target.value)}
      >
        Rechercher
      </Button>

      <Button
        type="button"
        id="geoButton"
        onClick={(e) => console.log(e.target.value)}
      >
        Ma Localisation
      </Button>
    </form>
  );
}
