// FilterDropdown.js
import React, { useEffect, useState } from 'react';

function FilterDropdown({
  selectedGrouping,
  setSelectedGrouping,
  selectedOrdering,
  setSelectedOrdering,
  groupedAndSortedTickets, // Ensure you pass this prop
  users, // Ensure you pass this prop
  priority
}) {
  const handleGroupingChange = (e) => {
    setSelectedGrouping(e.target.value);
  };
  console.log(selectedGrouping);
  console.log(selectedOrdering)


  const handleOrderingChange = (e) => {
    setSelectedOrdering(e.target.value);
  };

  // Check if groupedAndSortedTickets and users are defined before mapping them
  // const groupingOptions = groupedAndSortedTickets ? Object.keys(groupedAndSortedTickets) : [];
  const [groupingOptions, setGroupingOptions] = useState(["user", "priority", "status"]);
  const [orderingOptions, setOrdeingOptions] = useState(["priority", "user"]);

  // useEffect(() => {
    
  //   console.log(users);
  // const orderopt = ["user", "priority"];
  // setOrdeingOptions(orderopt);
  // // }, [users]);

  // // useEffect(() => {
    
  // const groupingopt = ["priority", "user","status"];
  // setGroupingOptions(groupingopt);
  // }, [priority]);
  // console.log("group",groupingOptions);
  // console.log("Order",orderingOptions);
  return (
    <div className="filter-dropdown">
      <label>Grouping: 
        <select value={selectedGrouping} onChange={handleGroupingChange}>
          {groupingOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      <label>Ordering: 
        <select value={selectedOrdering} onChange={handleOrderingChange}>
          {orderingOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default FilterDropdown;
