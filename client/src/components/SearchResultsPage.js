import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import { Container } from 'react-bootstrap';
import './SearchResultsPage.css';

function SearchResultsPage({ query, results }) {
    return (
        <Container className="search-results-page mt-4">
            <h2>Search Results for: {query}</h2>
            <div className="results">
                {results.length > 0 ? (
                    results.map((result, index) => (
                        <div key={index} className="result-item mb-2 p-2 border">
                            {result.title}
                        </div>
                    ))
                ) : (
                    <div>No results found</div>
                )}
            </div>
        </Container>
    );
}

export default SearchResultsPage;
