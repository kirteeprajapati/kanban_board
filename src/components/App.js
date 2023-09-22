// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FilterDropdown from './FilterDropdown';
import KanbanBoard from './KanbanBoard';
import '../styles/App.css';

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedGrouping, setSelectedGrouping] = useState('status');
  const [selectedOrdering, setSelectedOrdering] = useState('priority');
  const [data, setData] = useState({});
  
  async function fetchApi() {
    await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => {
        setTickets(response.data.tickets);
        setUsers(response.data.users);
        groupedAndSortedTickets();
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
  useEffect(() => {
    fetchApi();
  }, []);
  
  function groupedAndSortedTickets(){
    let groupedTickets = {};
    tickets.forEach(ticket => {
      if (selectedGrouping === 'user') {
        groupedTickets[ticket.userId] = groupedTickets[ticket.userId] || [];
        groupedTickets[ticket.userId].push(ticket);
      } else if (selectedGrouping === 'priority') {
        groupedTickets[ticket.priority] = groupedTickets[ticket.priority] || [];
        groupedTickets[ticket.priority].push(ticket);
      } else {
        groupedTickets[ticket.status] = groupedTickets[ticket.status] || [];
        groupedTickets[ticket.status].push(ticket);
      }
      
    });

    // Sort tickets based on selectedOrdering
    Object.keys(groupedTickets).forEach(key => {
      groupedTickets[key] = groupedTickets[key].sort((a, b) => {
        if (selectedOrdering === 'priority') {
          return b.priority - a.priority;
        } else {
          return a.title.localeCompare(b.title);
        }
      });
    });
    setData(groupedTickets);
  }

  useEffect(function(){
    groupedAndSortedTickets();  
  },[selectedGrouping, selectedOrdering,]);

  return (
    <div className="App">
      <h1>Kanban Board</h1>
      <FilterDropdown
        selectedGrouping={selectedGrouping}
        setSelectedGrouping={setSelectedGrouping}
        selectedOrdering={selectedOrdering}
        setSelectedOrdering={setSelectedOrdering}
        users={users}
      />
      <KanbanBoard
        users = {users}
        data = {data}
        className = "kanban_board"
        selectedGrouping = {selectedGrouping}
      />
    </div>
  );
}

export default App;
