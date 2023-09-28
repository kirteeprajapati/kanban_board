import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import FilterDropdown from './FilterDropdown';
import KanbanBoard from './KanbanBoard';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import '../App.css';

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedGrouping, setSelectedGrouping] = useState('status');
  const [selectedOrdering, setSelectedOrdering] = useState('user');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  async function fetchApi() {
    try {
      const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
      setTickets(response.data.tickets);
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchApi();
  }, []);

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

  const handleCardDrop = (cardId, newStatus) => {
    const updatedTickets = tickets.map((ticket) =>
      ticket.id === cardId ? { ...ticket, status: newStatus } : ticket
    );

    setTickets(updatedTickets);
  };

  return (
    <>
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
            onCardDrop={handleCardDrop} 
          />
        </div>
      </div>
    </>
  );
}

export default function WrappedApp() {
  return (
    <DndProvider backend={HTML5Backend}>
      <App />
    </DndProvider>
  );
}
