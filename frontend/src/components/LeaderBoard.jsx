import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LeaderBoard.css';

const LeaderBoard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await axios.get('http://localhost:5000/users/leaderboard');
      setUsers(res.data);
    } catch (err) {
      console.error('Failed to fetch leaderboard:', err);
    }
  };

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Photo</th>
            <th>Name</th>
            <th>Total Points</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={`http://localhost:5000/${user.photo.replace(/\\/g, '/')}`}
                  alt={user.name}
                  className="leaderboard-photo"
                />
              </td>
              <td>{user.name}</td>
              <td>{user.totalPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderBoard;
