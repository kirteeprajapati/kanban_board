import React, { useMemo } from 'react';
import KanbanColumn from './KanbanColumn';
import '../App.css';

function KanbanBoard({ users, tickets, selectedGrouping, selectedOrdering, onCardDrop }) {
  
  const uniqueTags = useMemo(() => {
    const tagsSet = new Set();
    tickets.forEach((ticket) => {
      const tag =
        selectedGrouping === 'user'
          ? ticket.userId
          : selectedGrouping === 'priority'
            ? ticket.priority
            : ticket.status;
      tagsSet.add(tag);
    });
    return Array.from(tagsSet);
  }, [tickets, selectedGrouping]);

  return (
    <div className="kanban-board">
      {uniqueTags.map((tag) => (
        <KanbanColumn
          key={tag}
          title={tag}
          tickets={tickets.filter((ticket) => {
            const ticketTag =
              selectedGrouping === 'user'
                ? ticket.userId
                : selectedGrouping === 'priority'
                  ? ticket.priority
                  : ticket.status;
            return ticketTag === tag;
          })}
          users={users}
          selectedGrouping={selectedGrouping}
          onCardDrop={onCardDrop}
        />
      ))}
    </div>
  );
}

export default KanbanBoard;
