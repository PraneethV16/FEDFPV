import React, { useContext } from 'react';
import { BookingContext } from '../context/BookingContext';
import TripCard from '../components/TripCard';

export default function TripList(){
  const { trips } = useContext(BookingContext);

  return (
    <div>
      <h2>Available Trips</h2>
      <div className="trip-grid">
        {trips.map(t => <TripCard key={t.id} trip={t} />)}
      </div>
    </div>
  );
}
