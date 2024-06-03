import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import TopBar from "./components/TopBar";
import SearchResultsPage from './components/SearchResultsPage';
import DetailsPage from './components/DetailsPage';
import ParticlesComponent from './components/Particles';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState(localStorage.getItem('searchQuery') || '');
  const [searchResults, setSearchResults] = useState(JSON.parse(localStorage.getItem('searchResults')) || []);
  const [details, setDetails] = useState(JSON.parse(localStorage.getItem('details')) || null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Updating localStorage with searchQuery:", searchQuery);
    localStorage.setItem('searchQuery', searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    console.log("Updating localStorage with searchResults:", searchResults);
    localStorage.setItem('searchResults', JSON.stringify(searchResults));
  }, [searchResults]);

  useEffect(() => {
    console.log("Updating localStorage with details:", details);
    localStorage.setItem('details', JSON.stringify(details));
  }, [details]);

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
        setDetails(null);  // Clear details on new search
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  };

  const handleTitleClick = (title) => {
    console.log('Fetching details for title: ', title);
    fetch(`http://localhost:3000/details?movie=${encodeURIComponent(title)}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();  // Parse the response as JSON
      })
      .then(data => {
        console.log("Parsed JSON Details Data:", data);
        setDetails(data);
        localStorage.setItem('details', JSON.stringify(data));  // Save details to localStorage
        navigate('/movie');  // Navigate to the movie details page
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  };

  return (
    <div className="App">
      <ParticlesComponent id="tsparticles" />
      <TopBar onSearch={handleSearch} />
      <div className="content">
        <Routes>
          <Route path="/search" element={<SearchResultsPage query={searchQuery} results={searchResults} onTitleClick={handleTitleClick} />} />
          <Route path="/movie" element={<DetailsPage details={details} />} />
          <Route path="/" element={
            <div className="container mt-4">
              <h1>Welcome to the Movie Ratings Analysis</h1>
              <div className="giphy-container">
                <iframe src="https://giphy.com/embed/BxQ2nb982qWRO" className="giphy-embed" frameBorder="0" allowFullScreen></iframe>
              </div>
              <p><a href="https://giphy.com/gifs/star-wars-hump-stormtrooper-BxQ2nb982qWRO">via GIPHY</a></p>
              <div className="about-section">
                <h2>About</h2>
                <p>
                  This website takes in data from a MySQL database which has two tables: RT and IMDb. The database has extracted keywords, sentiment analysis, 
                  and semantic analysis on the reviews and extracts positive keywords from negative reviews and negative keywords from positive reviews. 
                  When you search for a movie, the website displays both stats and all the reviews from both tables so you can compare them.
                </p>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </div>
  );
}

export default App;

