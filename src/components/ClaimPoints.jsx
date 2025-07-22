import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './ClaimPoints.css';
import { toast } from 'react-toastify';
import { HistoryContext } from '../context/HistoryContext';

const ClaimPoints = () => {
  const [users, setUsers] = useState([]);
  const [awardedPoints, setAwardedPoints] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedUserName, setSelectedUserName] = useState('');
  const { fetchHistory } = useContext(HistoryContext); // 👈 Context for history refresh

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/users/leaderboard');
      setUsers(res.data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  const handleClaim = async (userId, userName) => {
    try {
      const res = await axios.post(`http://localhost:5000/users/${userId}/claim`);
      setAwardedPoints(res.data.points);
      setSelectedUserName(userName);
      setShowPopup(true);
      await fetchUsers();       // 🔁 update leaderboard
      await fetchHistory();     // 🔁 update history
    } catch (err) {
      console.error('Claim failed:', err);
      toast.error('Failed to claim points');
    }
  };

  return (
    <div className="claim-container">
      <h2>Claim Points</h2>
      <div className="user-grid">
        {users.map((user) => (
          <div key={user._id} className="user-card">
            <div className="user-info">
              <img
                src={`http://localhost:5000/${user.photo.replace(/\\/g, '/')}`}
                alt={user.name}
              />
              <div className="user-details">
                <h3>{user.name}</h3>
                <p>Points: {user.totalPoints}</p>
              </div>
            </div>
            <button onClick={() => handleClaim(user._id, user.name)}>Claim</button>
          </div>
        ))}
      </div>

      {showPopup && (
        <div className="popup fireworks">
          <div className="popup-content">
            <h2>{selectedUserName} won {awardedPoints} points!</h2>
            <span className='coin'>🪙</span>
            <p>Great job!</p>
            <button onClick={() => setShowPopup(false)}>OK</button>
          </div>
          {/* Firework animation */}
          <div className="firework"></div>
          <div className="firework delay1"></div>
          <div className="firework delay2"></div>
        </div>
      )}
    </div>
  );
};

export default ClaimPoints;
