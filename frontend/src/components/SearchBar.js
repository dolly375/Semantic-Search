import { useState } from "react";
import "./SearchBar.css";

function SearchBar({ onSearch, loading }) {

  const [query, setQuery] = useState("");

  function handleSearch() {
    onSearch(query);
  }


  return (
    <div className="search-container">

      <input
        type="text"
        className="search-input"
        placeholder="Enter symptoms (example: fever, headache)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />


      <button
        className="search-btn"
        onClick={handleSearch}
        disabled={loading}
      >

        {loading ? "Searching..." : "Search"}

      </button>


    </div>
  );
}


export default SearchBar;