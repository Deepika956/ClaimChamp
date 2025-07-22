import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <NavLink className="navontop" to="/"><h2 className="logo"><img className='logo-image' src="/logo.png" alt="" />ClaimChamp</h2></NavLink>

      <div className="hamburger" onClick={toggleMenu}>
        <span className={isOpen ? 'bar rotate-bar1' : 'bar'}></span>
        <span className={isOpen ? 'bar fade-bar' : 'bar'}></span>
        <span className={isOpen ? 'bar rotate-bar2' : 'bar'}></span>
      </div>

      <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
        <li><NavLink to="/" onClick={closeMenu}>Leaderboard</NavLink></li>
        <li><NavLink to="/claim" onClick={closeMenu}>Claim Points</NavLink></li>
        <li><NavLink to="/add-user" onClick={closeMenu}>Add User</NavLink></li>
        <li><NavLink to="/history" onClick={closeMenu}>Claim History</NavLink></li>
      </ul>
    </nav>
  );
};

export default NavBar;
