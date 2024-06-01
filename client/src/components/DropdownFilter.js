import React, { useState } from 'react';
import "./DropdownFilter.css";

export default function DropdownFilter({ options, onSelect }) {
    const [selectedOption, setSelectedOption] = useState('Title');

    const handleSelect = (option) => {
        setSelectedOption(option);
        onSelect(option);
    };

    return (
        <div className="dropdown">
            <button
                className="custom-filter btn btn-success dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                Filter: {selectedOption}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {options.map((option, index) => (
                    <li key={index}>
                        <a
                            className="dropdown-item"
                            href="#"
                            onClick={() => handleSelect(option)}
                        >
                            {option}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};
