import React from 'react';
import '../styles/kanbanCard.css';

function UserProfile({ userId, users }) {
  const user = users.find(u => u.id === userId);
  const userName = user?.name || '';

  const userInitial = userName.charAt(0);

  const getColorForUserId = (userId) => {
    const hashCode = userId.toString().split('').reduce((acc, char) => {
      return char.charCodeAt(0) + acc;
    }, 0);

    const colors = ['#ff9bcd', '#ffb732', '#00BFFF', '#32CD32', '#800080']; // Add more colors as needed
    const colorIndex = hashCode % colors.length;
    return colors[colorIndex];
  };

  const bgColor = getColorForUserId(userId);

  return (
    <div className="profile-image">
      <div className="profile-frame" style={{ backgroundColor: bgColor }}>
        <div className="profile-initial">
          {userInitial}
        </div>
      </div>
      <div className="online-dot" style={{ backgroundColor: user?.available ? "#007811" : "#acacac", borderColor:"#cdcdcd", borderWidth:"5px"}}></div>
    </div>
  );
}

export default UserProfile;