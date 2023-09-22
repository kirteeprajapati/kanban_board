import React, { useState } from 'react';
import '../styles/KanbanCard.css';

function KanbanCard({ ticket, users, groupingOption }) {
  const [isMessageVisible, setMessageVisible] = useState(false);
  const [message, setMessage] = useState('');

  const toggleMessageInput = () => {
    setMessageVisible(!isMessageVisible);
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const getUserStatus = (userId) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      if (user.available) {
        return 'Available';
      } else {
        return 'Not Available';
      }
    }
    return 'User not found';
  };

  const renderPriorityCard = () => {
    // Priority card layout
    const userId = ticket.userId;

    return (
      <div className="kanban-card">
        <div className="top-row">
          <div className="user-id">
            {userId}
          </div>
          <div className="profile-image">
            <img src={`https://via.placeholder.com/50?text=User+${userId}`} alt={`User ${userId}`} />
          </div>
        </div>
        <div className="user-status">
          {getUserStatus(userId)}
        </div>
        <div className="ticket-title">
          {ticket.title}
        </div>
        <div className="feature-request-button">
          <button onClick={toggleMessageInput}>Feature Request</button>
          {isMessageVisible && (
            <div className="message-input">
              <textarea
                rows="3"
                placeholder="Write your message..."
                value={message}
                onChange={handleInputChange}
              ></textarea>
              <button onClick={toggleMessageInput}>Submit</button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderUserCard = () => {
    // User card layout
    const userId = ticket.userId;
    const status = ticket.status;

    return (
      <div className="kanban-card">
        <div className="top-row">
          <div className="user-id">
            {userId}
          </div>
          <div className="profile-image">
            <img src={`https://via.placeholder.com/50?text=User+${userId}`} alt={`User ${userId}`} />
          </div>
        </div>
        <div className="check-button">
          {/* Customize the check button based on 'status' */}
          {status === 'Todo' && <div className="empty-circle"></div>}
          {status === 'In progress' && <div className="half-yellow-circle"></div>}
          {status === 'Done' && <div className="blue-circle-with-tick">✓</div>}
        </div>
        <div className="ticket-title">
          {ticket.title}
        </div>
        <div className="feature-request-button">
          <button onClick={toggleMessageInput}>Feature Request</button>
          {isMessageVisible && (
            <div className="message-input">
              <textarea
                rows="3"
                placeholder="Write your message..."
                value={message}
                onChange={handleInputChange}
              ></textarea>
              <button onClick={toggleMessageInput}>Submit</button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return groupingOption === 'priority' ? renderPriorityCard() : renderUserCard();
}

export default KanbanCard;
