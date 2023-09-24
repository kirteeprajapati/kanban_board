// KanbanBoard.jsx
import React, { useMemo } from 'react';
import KanbanColumn from './KanbanColumn';
import '../styles/kanbanBoard.css'

function KanbanBoard({ users, tickets, selectedGrouping }) {
  const groupedAndSortedTickets = useMemo(() => {
    const groupedTickets = {};
    tickets.forEach((ticket) => {
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
    Object.keys(groupedTickets).forEach((key) => {
      groupedTickets[key] = groupedTickets[key].sort((a, b) => {
        if (selectedGrouping === 'priority') {
          return b.priority - a.priority;
        }
        return a.title.localeCompare(b.title);
      });
    });
    return groupedTickets;
  }, [tickets, selectedGrouping]);

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
