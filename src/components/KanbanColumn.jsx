// KanbanColumn.js
import React from 'react';
import KanbanCard from './KanbanCard';

function KanbanColumn({ title, tickets, users }) {
  const renderCards = () => {
    return tickets.map(ticket => (
      <KanbanCard
        key={ticket.id}
        ticket={ticket}
        users={users}
      />
    ));
  };

  return (
    <div className="kanban-column">
      <h2>{title}</h2>
      {renderCards()}
    </div>
  );
}

export default KanbanColumn;
