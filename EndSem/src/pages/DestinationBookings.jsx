import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { BookingContext } from "../context/BookingContext";

export default function DestinationBookings(){
  const { name } = useParams();
  const { bookings } = useContext(BookingContext);

  const decoded = decodeURIComponent(name);
  const filtered = bookings.filter(b => b.destination === decoded);

  return (
    <div>
      <h2>Bookings for {decoded}</h2>
      {filtered.length === 0 && <p>No bookings for {decoded} yet.</p>}
      {filtered.map(b => (
        <div key={b.id} className="card">
          <p><strong>{b.name}</strong> — {b.date} — ₹{b.price}</p>
        </div>
      ))}
    </div>
  );
}
