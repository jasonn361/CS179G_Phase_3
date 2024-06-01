import React, { useState } from 'react';
import './SearchBar.css';

export default function SearchBar({ placeholder, onSearch }) {
    const [query, setQuery] = useState('');

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form className="d-flex" onSubmit={handleSearch}>
            <input
                className="form-control me-2 bg-dark text-white"
                type="search"
                placeholder={placeholder}
                aria-label="Search"
                value={query}
                onChange={handleInputChange}
            />
            <button className="btn btn-outline-primary custom-search-button" type="submit">
                Search
            </button>
        </form>
    );
};

