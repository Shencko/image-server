// src/components/SearchPage.js
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleQueryChange = (e) => setQuery(e.target.value);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/api/search?query=${query}`);
      setResults(response.data);
    } catch (error) {
      console.error("Error searching images:", error);
    }
  };

  return (
    <div>
      <h2>Search Images</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          required
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {results.map((result) => (
          <div key={result.id}>
            <img src={result.thumbnailUrl} alt={result.tags} />
            <p>{result.tags}</p>
            <Link to={`/detail/${result.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
