import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import TopBar from "./components/TopBar";
import './App.css';

function App() {
  const options = ['Title',  'Genre', 'Director'];

  const handleSearch = (query) => {
    console.log('Search query: ', query);
  };

  const handleSelect = (selectedOption) => {
    console.log('Selected option: ', selectedOption);
  };

  return (
    <div className="App">
      <TopBar options={options} onSearch={handleSearch} onSelect={handleSelect} />
      <div className="container mt-4">
          <h1>Content Goes Here</h1>
      </div>
    </div>
  );
}

export default App;
