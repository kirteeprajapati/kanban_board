import React from 'react';
import { fade_circle } from '../assets/index';
import UserProfile from './UserProfile';
import '../App.css'

function KanbanCard({ statusIcon, ticket, users, selectedGrouping, priorityIcon }) {
  // Extracting necessary data from the ticket
  const taskId = ticket.id;
  const status = ticket.status;

  // Render the card based on the selected grouping
  const renderCard = () => {
    // Determine the card class based on the selected grouping
    const cardClass = `kanban-card ${selectedGrouping === 'priority' ? 'priority-card' : ''}`;

    return (
      <div className={cardClass}>
        {/* Top row of the card */}
        <div className="top-row">
          <div className="user-id">{taskId}</div>
          {/* Render user profile only when grouping is not 'users' */}
          {selectedGrouping !== 'users' && (
            <div className="user-profile">
              <UserProfile userId={ticket.userId} users={users} />
            </div>
          )}
        </div>

        {/* Ticket title */}
        <div className="ticket-title">
          {selectedGrouping === 'priority' && (
            <img src={statusIcon[ticket.status]} alt="Status Icon" style={{ marginRight: '10px', height:"15px"}} />
          )}
          {ticket.title}
        </div>

        {/* Feature request block */}
        <div className="feature-request-button">
          {selectedGrouping !== 'priority' && (
            <img className="priority-icon" src={priorityIcon[ticket.priority]} alt="Priority Icon" />
          )}
          <div className='Feature_block'>
            <img src={fade_circle} className="status-icon" alt="Status Icon" />
            <span className="feature-text">Feature Request</span>
          </div>
        </div>
      </div>
    );
  };

  // Render the card component
  return renderCard();
}

export default KanbanCard;
