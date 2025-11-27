import { useState } from "react";
import Input from "./Input.jsx";
import Button from "./Button.jsx";

export default function SearchForm({ onSearch, onLocation }) {
  const [city, setCity] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(city);
  };

  return (
    <form onSubmit={handleSearch} className="search-container card">
      <Input
        type="search"
        placeholder="Entrez une ville..."
        ariaLabel="Rechercher une ville"
        onChange={setCity}
      />

      <Button type="submit">Rechercher</Button>
      <Button type="button" onClick={onLocation}>
        Ma Localisation
      </Button>
    </form>
  );
}
