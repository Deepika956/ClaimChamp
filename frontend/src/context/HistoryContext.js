import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../api'; 
export const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/history`);
      setHistory(res.data);
    } catch (err) {
      console.error('Error fetching history:', err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <HistoryContext.Provider value={{ history, fetchHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};
