import React from 'react';
import KanbanColumn from './KanbanColumn';
import '../styles/kanbanBoard.css'; // Import custom styles for the Kanban board

function KanbanBoard({users, data, selectedGrouping}) {
  console.log(Object.keys(data));
  
  return (
    <div className="kanban-board">
      {data && data !== 'undefined' && Object.keys(data).map((key) => (
      <KanbanColumn
        key={key}
        title={key}
        tickets={data[key]}
        users={users}
        className = "kanban_column"
        selectedGrouping = {selectedGrouping}
        // groupingOption={groupingOption} // Pass the grouping option to the column
      />))
      }
    </div>
  );
 
}

export default KanbanBoard;
