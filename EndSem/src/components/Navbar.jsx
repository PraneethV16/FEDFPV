import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar(){
  return (
    <nav className="nav">
      <Link to="/" className="link">Trips</Link>
      <Link to="/add" className="link">Add Booking</Link>
      <Link to="/history" className="link">Booking History</Link>
      <div style={{marginLeft:'auto'}} className="small">Travel Booking App</div>
    </nav>
  );
}
