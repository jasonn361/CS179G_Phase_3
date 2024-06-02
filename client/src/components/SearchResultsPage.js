import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from 'react';
import { Container, Form, FormControl, Button, Dropdown } from 'react-bootstrap';
import './SearchResultsPage.css';

function SearchResultsPage() {
  const [query, setQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState('Filter');
  const [results, setResults] = useState([]);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchClick = () => {
    // Mock results based on the search query
    setResults([
      'Result 1',
      'Result 2',
      'Result 3'
    ]);
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <Container className="search-results-page mt-4">
      <Form inline className="search-bar mb-4">
        <FormControl
          type="text"
          placeholder="Search"
          className="mr-sm-2"
          value={query}
          onChange={handleSearchChange}
        />
        <Button variant="primary" onClick={handleSearchClick}>Search</Button>
        <Dropdown className="ml-2">
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {selectedOption}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {['Title', 'Genre', 'Director'].map((option) => (
              <Dropdown.Item key={option} onClick={() => handleSelect(option)}>
                {option}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Form>
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
