import React, { useMemo } from 'react';
import KanbanColumn from './KanbanColumn';
import '../App.css';

function KanbanBoard({ users, tickets, selectedGrouping, selectedOrdering }) {
  // Group and sort tickets based on selectedGrouping and selectedOrdering
  const groupedAndSortedTickets = useMemo(() => {
    const groupedTickets = {};

    // Function to sort tickets based on selectedOrdering
    const sortTickets = (a, b) => {
      if (selectedOrdering === 'priority') {
        return b.priority - a.priority;
      }
      return a.title.localeCompare(b.title);
    };

    // Group tickets
    tickets.forEach((ticket) => {
      const groupKey =
        selectedGrouping === 'user'
          ? ticket.userId
          : selectedGrouping === 'priority'
            ? ticket.priority
            : ticket.status;

      groupedTickets[groupKey] = groupedTickets[groupKey] || [];
      groupedTickets[groupKey].push(ticket);
    });

    // Sort grouped tickets
    Object.keys(groupedTickets).forEach((key) => {
      groupedTickets[key].sort(sortTickets);
    });

    return groupedTickets;
  }, [tickets, selectedGrouping, selectedOrdering]);

  return (
    <div className="kanban-board">
      {Object.keys(groupedAndSortedTickets).map((key) => (
        <KanbanColumn
          key={key}
          title={key}
          tickets={groupedAndSortedTickets[key]}
          users={users}
          selectedGrouping={selectedGrouping}
        />
      ))}
    </div>
  );
}

export default KanbanBoard;
