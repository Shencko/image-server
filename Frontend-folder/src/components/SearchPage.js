// src/components/SearchPage.js
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
    <PageContainer>
      <h2>Search Images</h2>
      <SearchForm onSubmit={handleSearch}>
        <SearchInput
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder="Enter search query"
          required
        />
        <SearchButton type="submit">Search</SearchButton>
      </SearchForm>
      <ResultsContainer>
        {results.map((result) => (
          <ResultItem key={result.id}>
            <Thumbnail src={result.thumbnailUrl} alt={result.tags} />
            <Tags>{result.tags}</Tags>
            <DetailsLink to={`/detail/${result.id}`}>View Details</DetailsLink>
          </ResultItem>
        ))}
      </ResultsContainer>
    </PageContainer>
  );
};

export default SearchPage;

const PageContainer = styled.div`
  padding: 20px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const SearchForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SearchButton = styled.button`
  padding: 10px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`;

const ResultsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const ResultItem = styled.div`
  flex: 1 1 calc(33.333% - 20px);
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  text-align: center;
`;

const Thumbnail = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 4px;
`;

const Tags = styled.p`
  margin: 10px 0;
  color: #666;
`;

const DetailsLink = styled(Link)`
  display: inline-block;
  padding: 10px;
  background-color: #333;
  color: white;
  border-radius: 4px;
  text-decoration: none;

  &:hover {
    background-color: #555;
  }
`;
