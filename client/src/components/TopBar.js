import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import SearchBar from './SearchBar';
// import DropdownFilter from './DropdownFilter';
import "./TopBar.css";

export default function TopBar({ /*options,*/ onSearch/*, onSelect, currentFilter*/ }) {
    return (
        <nav className="custom-topbar navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand fw-bold">Movie Ratings Analysis</Link>
                <div className="d-flex align-items-center">
                    <SearchBar placeholder="Search..." onSearch={onSearch} /*currentFilter={currentFilter}*/ />
                    {/*<DropdownFilter options={options} onSelect={onSelect} />*/}
                </div>
            </div>
        </nav>
    );
};
