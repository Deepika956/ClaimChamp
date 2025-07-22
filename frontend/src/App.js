import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import NavBar from './components/NavBar';
import LeaderBoard from './components/LeaderBoard';
import ClaimPoints from './components/ClaimPoints';
import CreateUser from './components/CreateUser';
import History from './components/History';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<LeaderBoard />} />
          <Route path="/claim" element={<ClaimPoints />} />
          <Route path="/add-user" element={<CreateUser />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
      
      {/* ✅ Add this to make toast messages work */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover
        theme="colored"
      />
    </Router>
  );
}

export default App;
