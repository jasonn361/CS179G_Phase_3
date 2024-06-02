import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TopBar from "./components/TopBar";
import SearchResultsPage from './components/SearchResultsPage';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const options = ['Title', 'Genre', 'Director'];

  const handleSearch = (query) => {
    console.log('Search query: ', query);
    setSearchQuery(query);
  };

  const handleSelect = (selectedOption) => {
    console.log('Selected option: ', selectedOption);
  };

  return (
    <Router>
      <div className="App">
        <TopBar options={options} onSearch={handleSearch} onSelect={handleSelect} />
        <Routes>
          <Route path="/search" element={<SearchResultsPage query={searchQuery}/>} />
          <Route path="/" exact element={
            <div className="container mt-4">
              <h1>Content Goes Here</h1>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
