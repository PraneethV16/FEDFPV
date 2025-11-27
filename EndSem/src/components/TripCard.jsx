import React from "react";
import { Link } from "react-router-dom";

export default function TripCard({ trip }){
  return (
    <div className="card">
      <img src={trip.image} alt={trip.destination} className="trip-image"/>
      <h4>{trip.destination}</h4>
      <p className="small">{trip.description}</p>
      <p className="small">Price: ₹{trip.price}</p>
      <div style={{display:'flex',gap:8,marginTop:8}}>
        <Link className="link" to={`/destination/${encodeURIComponent(trip.destination)}`}>View Bookings</Link>
        <a className="link" href={`mailto:?subject=Trip to ${trip.destination}&body=Check this trip: ${window.location.origin}`}>Share</a>
      </div>
    </div>
  );
}
