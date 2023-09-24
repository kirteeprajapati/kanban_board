// App.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import FilterDropdown from './FilterDropdown';
import KanbanBoard from './KanbanBoard';
import '../styles/App.css'

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedGrouping, setSelectedGrouping] = useState('priority');
  const [selectedOrdering, setSelectedOrdering] = useState('status');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  async function fetchApi() {
    await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => {
        setTickets(response.data.tickets);
        setUsers(response.data.users);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  useEffect(() => {
    fetchApi();
  }, []);

  // Close the dropdown when clicking outside of it
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="App">
      <div className="app-container">
        <FilterDropdown
          selectedGrouping={selectedGrouping}
          setSelectedGrouping={setSelectedGrouping}
          selectedOrdering={selectedOrdering}
          setSelectedOrdering={setSelectedOrdering}
          users={users}
          isDropdownOpen={isDropdownOpen}
          setIsDropdownOpen={setIsDropdownOpen}
          dropdownRef={dropdownRef}
        />
        <KanbanBoard
          users={users}
          tickets={tickets}
          selectedGrouping={selectedGrouping}
          selectedOrdering={selectedOrdering}
        />
      </div>
    </div>
  );
}

export default App;
