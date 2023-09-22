import React, { useState } from 'react';
import '../styles/KanbanCard.css';
import { fade_circle, dashed_circle, void_circle, done } from '../assets/index';
import UserProfile from './UserProfile';
function KanbanCard({ statusIcon, ticket, users, groupingOption, selectedGrouping, priorityIcon }) {
  const [isMessageVisible, setMessageVisible] = useState(false);
  const [message, setMessage] = useState('');
  const userId = ticket.userId;
  const status = ticket.status;
  
  // const imgURL = `src/assets/${priorityIcon[ticket.priority]}.svg`;
  // console.log(imgURL);
  const renderPriorityCard = () => {
    // Priority card layout
    const userId = ticket.userId;

    return (
      <div className="kanban-card">
        <div className="top-row">
          <div className="user-id">
            {userId}
          </div>
          <UserProfile userId = {userId} users = {users}/>
        </div>
        <div className="ticket-title">
        {selectedGrouping === 'priority' ? <img src = {statusIcon[ticket.status]}/>:<></>} 
          {ticket.title}
        </div>
        <div className="feature-request-button">
           {selectedGrouping !== 'priority' ? <img style = {{marginRight: "10px"}} src = {priorityIcon[ticket.priority]}/>:<></>}
            <img src = {fade_circle}/>
            <span style={{fontSize: "15px"}}> Feature Request</span> 
        
        </div>
      </div>
    );
  };

  const renderUserCard = () => {
    // User card layout
    

    return (
      <div className="kanban-card">
        <div className="check-button">
          {/* Customize the check button based on 'status' */}
          {status === 'Todo' && <img src = {void_circle} className="empty-circle"/>}
          {status === 'In progress' && <img src = {dashed_circle} className="half-yellow-circle"/>}
          {status === 'Done' && <img src = {done} className="blue-circle-with-tick"/>}
          <div className="ticket-title">
            {ticket.title}
          </div>
        </div>
      
        <div className="feature-request-button">
          
            <img style = {{marginRight: "10px"}} src = {priorityIcon[ticket.priority]}/>
            <img src = {fade_circle}/>
            <span> Feature Request</span> 
          
          
        </div>
      </div>
    );
  };

  return  selectedGrouping !== 'user' ? renderPriorityCard() : renderUserCard();
}

export default KanbanCard;
