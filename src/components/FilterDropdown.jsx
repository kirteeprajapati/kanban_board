import React, { useState, useEffect, useRef } from 'react';
import { display_filter, down } from '../assets/index';
import '../styles/filterDropDown.css'; // Add your CSS file for styling

function FilterDropdown({
  selectedGrouping,
  setSelectedGrouping,
  selectedOrdering,
  setSelectedOrdering,
}) {
  const [groupingOptions] = useState(["user", "priority", "status"]);
  const [orderingOptions] = useState(["priority", "user"]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Add a click event listener to the document to close the dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleGroupingChange = (e) => {
    setSelectedGrouping(e.target.value);
  };

  const handleOrderingChange = (e) => {
    setSelectedOrdering(e.target.value);
  };

  return (
    <div className="filter-dropdown-container" ref={dropdownRef}>
      <div className='display-button' onClick={handleDropdownClick}>
        <img src={display_filter} alt="Display Filter Logo" className="filter-logo" />
        Display
        <img src={down} alt="Display Filter Logo" className="down-logo" />
      </div>
      {isDropdownOpen && (
        <div className="filter-dropdown">
          <label className='grouping'>
            Grouping:
            <select value={selectedGrouping} onChange={handleGroupingChange}>
              {groupingOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className='ordering'>
            Ordering:
            <select value={selectedOrdering} onChange={handleOrderingChange}>
              {orderingOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}
    </div>
  );
}

export default FilterDropdown;
