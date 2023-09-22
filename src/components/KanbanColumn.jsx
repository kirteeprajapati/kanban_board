// KanbanColumn.js
import React from 'react';
import KanbanCard from './KanbanCard';
import { Vector, plus, done, no_priority, low, medium, high, urgent, void_circle, dashed_circle, in_progress } from '../assets';
import UserProfile from './UserProfile';

function KanbanColumn({ title, tickets, users, selectedGrouping}) {
  const priorityIcon = [no_priority, low, medium, high, urgent];
  const statusIcon = {
    "In progress": in_progress,
    "Todo": void_circle,
    "Done": done,
    "Backlog": dashed_circle,
  }
  const renderCards = () => {
    return tickets.map(ticket => (
      <KanbanCard
        key={ticket.id}
        ticket={ticket}
        users={users}
        selectedGrouping = {selectedGrouping}
        priorityIcon={priorityIcon}
        statusIcon = {statusIcon}
      />
    ));
  };
  

  return (
    <div className="kanban-column">
      <div style = {{display: "flex"}}>
        <div style ={{display: "inline-block", marginRight: "120px"}}>
          
          <div style = {{display: "flex"}}>{selectedGrouping === 'user'? 
            <UserProfile users = {users} userId={title}/>
          : (selectedGrouping === 'priority'? <img src = {priorityIcon[title]}/>:<img src = {statusIcon[title]}/>)}
          <span style={{marginLeft: "20px", marginRight: "10px"}}>{title}</span>
          <span>{tickets.length}</span>
          </div>
        </div>
        <div style ={{display: "inline-block"}}>
          <img src = {plus}/>
          <img src = {no_priority}/>
        </div>
      </div>
      
      {renderCards()}
    </div>
  );
}

export default KanbanColumn;
