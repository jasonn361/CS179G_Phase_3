import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from 'react';
import { Container, Form, FormControl, Button, Dropdown } from 'react-bootstrap';
import './SearchResultsPage.css';

function SearchResultsPage({ query }) {
  // Mock results based on the search query
  const results = ['Result 1', 'Result 2', 'Result 3'];

  return (
    <Container className="search-results-page mt-4">
      <h2>Search Results for: {query}</h2>
      <div className="results">
        {results.map((result, index) => (
          <div key={index} className="result-item mb-2 p-2 border">
            {result}
          </div>
        ))}
      </div>
    </Container>
  );
}

export default SearchResultsPage;
