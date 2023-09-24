// KanbanColumn.jsx
import React from 'react';
import KanbanCard from './KanbanCard';
import { plus, done, no_priority, low, medium, high, urgent, void_circle, dashed_circle, in_progress, cancel, three_dot } from '../assets';
import UserProfile from './UserProfile';
import '../App.css'

function KanbanColumn({ title, tickets, users, selectedGrouping }) {
  const priorityIcon = [no_priority, low, medium, high, urgent];

  const priorityLabels = priorityIcon.map((icon, index) => {
    switch (index) {
      case 0:
        return "No Priority";
      case 1:
        return "Low";
      case 2:
        return "Medium";
      case 3:
        return "High";
      case 4:
        return "Urgent";
      default:
        return "Unknown Priority";
    }
  });

  console.log(priorityLabels);

  const statusIcon = {
    "In progress": in_progress,
    "Todo": void_circle,
    "Done": done,
    "Backlog": dashed_circle,
    "Canceled": cancel,
  };

  return (
    <div className='kanban-column'>
      <div className="Column-heading">
        <div style={{ display: "flex", alignItems: "center", padding: "0px" }}>
          {selectedGrouping === 'user' ? (
            <UserProfile users={users} userId={title} selectedGrouping={selectedGrouping}/>
          ) : (
            selectedGrouping === 'priority' ? (
              <img src={priorityIcon[title]} alt="Priority Icon" style={{ marginRight: "10px" }} />
            ) : (
              <img src={statusIcon[title]} alt="Status Icon" style={{ margin: "0px" }} />
            )
          )}

          {title == 'user' && <span style={{ fontSize: "1em", marginLeft: "10px", marginRight: "10px" }}>{title}</span>}
          <span style={{ marginLeft: "4px", marginRight: "20px", position: "relative" }}>{tickets.length}</span>
        </div>

        <div style={{justifyContent:"space-between"}}>
          <img src={plus} alt="Plus Icon" style={{ marginRight: "10px"}} />
          <img src={three_dot} alt="Three Dots Icon" />
        </div>

      </div>

      {tickets.map((ticket) => (
        <KanbanCard
          key={ticket.id}
          ticket={ticket}
          users={users}
          selectedGrouping={selectedGrouping}
          priorityIcon={priorityIcon}
          statusIcon={statusIcon}
        />
      ))}
    </div>
  );
}

export default KanbanColumn;