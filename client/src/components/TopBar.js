import React from 'react';
import SearchBar from './SearchBar';
import DropdownFilter from './DropdownFilter';
import "./TopBar.css";

export default function NavbarContainer({ options, onSearch, onSelect }) {
    return (
        <nav className="custom-topbar navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand fw-bold" href="#">Movie Ratings Analysis</a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <div className="d-flex align-items-center">
                        <div className="me-2">
                            <SearchBar placeholder="Search..." onSearch={onSearch} />
                        </div>
                        <DropdownFilter options={options} onSelect={onSelect} />
                    </div>
                </div>
            </div>
        </nav>
    );
};
