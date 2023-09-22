export default function UserProfile({userId, users}) {
    let color = "grey";
    const user = users.find(u => u.id === userId);
    if (user) {
      if (user.available) {
        color  = "green";
      } else {
        color = "grey";
      }
    }
  
    return (
        <div className="profile-image">
            <img className = "profile"  src={`https://via.placeholder.com/50?text=User+${userId}`} alt={`User ${userId}`} />
            <div class="online-dot" style={{backgroundColor: `${color}`}}></div>
        </div>
    )
}