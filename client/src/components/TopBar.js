import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import "./TopBar.css";

export default function TopBar({ onSearch }) {
    return (
        <nav className="custom-topbar navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand fw-bold">Movie Ratings Analysis</Link>
                <div className="d-flex align-items-center">
                    <SearchBar placeholder="Search for movies" onSearch={onSearch}/>
                </div>
            </div>
        </nav>
    );
};
