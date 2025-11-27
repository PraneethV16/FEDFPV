import React, { useContext } from "react";
import { BookingContext } from "../context/BookingContext";
import { Link } from "react-router-dom";

export default function BookingHistory(){
  const { bookings, deleteBooking } = useContext(BookingContext);

  return (
    <div>
      <h2>Booking History</h2>
      {bookings.length === 0 && <p>No bookings yet.</p>}
      {bookings.map(b => (
        <div key={b.id} className="card">
          <h4>{b.destination}</h4>
          <p className="small">{b.name} — {b.date} — ₹{b.price}</p>
          <div style={{display:'flex',gap:8,marginTop:8}}>
            <Link className="link" to={`/destination/${encodeURIComponent(b.destination)}`}>View all for {b.destination}</Link>
            <button className="button" style={{background:'#e53e3e'}} onClick={()=>{
              if(window.confirm('Delete booking?')) deleteBooking(b.id);
            }}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
