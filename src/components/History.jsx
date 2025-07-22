import React, { useContext, useEffect } from "react";
import { HistoryContext } from "../context/HistoryContext";
import "./History.css";

const History = () => {
  const { history, fetchHistory } = useContext(HistoryContext);

  useEffect(() => {
    fetchHistory();
    console.log("Fetching history...");
  }, []);

  // And log inside JSX:
  console.log("Current history:", history);
  return (
    <div className="history-container">
      <h2>Claim History</h2>
      {history.length === 0 ? (
        <p>No claims yet.</p>
      ) : (
        <div className="history-list">
          {history.map((entry) => (
            <div key={entry._id} className="history-entry">
              <div className="user-photo-wrap">
                <img
                  src={`http://localhost:5000/${entry.user.photo.replace(
                    /\\/g,
                    "/"
                  )}`}
                  alt={entry.user.name}
                  className="user-photo"
                />
              </div>
              <div className="history-info">
                <strong>{entry.user.name}</strong> claimed{" "}
                <strong>{entry.points}</strong> points
                <br />
                <span>{new Date(entry.createdAt).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
