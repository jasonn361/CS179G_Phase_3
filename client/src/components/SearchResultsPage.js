import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './SearchResultsPage.css';

function SearchResultsPage({ query, results, onTitleClick }) {
    const navigate = useNavigate();
    const [displayCount, setDisplayCount] = useState(10); // Number of results to display initially

    const handleTitleClick = (title) => {
        onTitleClick(title);
        navigate('/details');
    };

    const loadMoreResults = () => {
        setDisplayCount(prevCount => prevCount + 10); // Load 10 more results
    };

    const backToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Container className="search-results-page mt-4">
            <h2>Search Results for: {query}</h2>
            <div className="results">
                {results.length > 0 ? (
                    <>
                        {results.slice(0, displayCount).map((result, index) => (
                            <div key={index} className="result-item mb-2 p-2 border" onClick={() => handleTitleClick(result.title)}>
                                {result.title}
                            </div>
                        ))}
                        {displayCount < results.length && (
                            <Button onClick={loadMoreResults} className="load-more-button">Load More</Button>
                        )}
                        {displayCount >= results.length && (
                            <Button onClick={() => setDisplayCount(10)} className="hide-button">Hide</Button>
                        )}
                    </>
                ) : (
                    <div>No results found</div>
                )}
            </div>
            <Button onClick={backToTop} className="back-to-top-button">Back to Top</Button>
        </Container>
    );
}

export default SearchResultsPage;
