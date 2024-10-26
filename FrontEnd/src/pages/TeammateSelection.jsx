import React, { useState, useEffect, useContext } from 'react';
//import { useHistory } from 'react-router-dom';
import { GlobalContext } from '../GlobalStateProvider'; 

const TeammateSelection = () => {
  const [teammates, setTeammates] = useState([]);
  const { state } = useContext(GlobalContext); // Access user info 
  //const history = useHistory();

  // Fetch teammates from backend API
  useEffect(() => {
    const fetchTeammates = async () => {
      try {
        const response = await fetch(`/api/get-teammates?userId=${state.user.id}`);
        const data = await response.json();
        setTeammates(data);
      } catch (error) {
        console.error('Error fetching teammates:', error);
      }
    };

    if (state.user) {
      fetchTeammates();
    }
  }, [state.user]);

  // Handle teammate selection
  const handleSelectTeammate = (teammateId) => {
    history.push(`/evaluate/${teammateId}`); // Navigate evaluation page
  };

  return (
    <div>
      <h2>Select a Teammate to Evaluate</h2>
      {teammates.length === 0 ? (
        <p>No teammates available for evaluation.</p>
      ) : (
        <ul>
          {teammates.map((teammate) => (
            <li key={teammate.id}>
              {teammate.name}{' '}
              <button onClick={() => handleSelectTeammate(teammate.id)}>Evaluate</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TeammateSelection;
