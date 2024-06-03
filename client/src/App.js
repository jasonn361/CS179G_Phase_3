import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TopBar from "./components/TopBar";
import SearchResultsPage from './components/SearchResultsPage';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState(localStorage.getItem('searchQuery') || '');
  const [searchResults, setSearchResults] = useState(JSON.parse(localStorage.getItem('searchResults')) || []);

  useEffect(() => {
    console.log("Updating localStorage with searchQuery:", searchQuery);
    localStorage.setItem('searchQuery', searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    console.log("Updating localStorage with searchResults:", searchResults);
    localStorage.setItem('searchResults', JSON.stringify(searchResults));
  }, [searchResults]);

  const handleSearch = (query) => {
    console.log('Search query: ', query);
    setSearchQuery(query);
    fetch(`http://localhost:3000/fetch?term=${query}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();  // Parse the response as JSON
      })
      .then(data => {
        console.log("Parsed JSON Data:", data);
        setSearchResults(data);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  };

  return (
    <Router>
      <div className="App">
        <TopBar onSearch={handleSearch} />
        <Routes>
          <Route path="/search" element={<SearchResultsPage query={searchQuery} results={searchResults} />} />
          <Route path="/" exact element={
            <div className="container mt-4">
              <h1>Welcome to the Movie Ratings Analysis</h1>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
