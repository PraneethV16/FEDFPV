import React, { useContext, useMemo } from 'react';
import { BookingContext } from '../context/BookingContext';

export default function SummaryCard(){
  const { bookings } = useContext(BookingContext);

  const summary = useMemo(()=>{
    const total = bookings.length;
    const amount = bookings.reduce((s,b)=>s + Number(b.price || 0), 0);
    const counts = {};
    bookings.forEach(b => { counts[b.destination] = (counts[b.destination] || 0) + 1 });
    const mostVisited = Object.keys(counts).length ? Object.keys(counts).reduce((a,b)=> counts[a] > counts[b] ? a : b) : 'N/A';
    return { total, amount, mostVisited };
  },[bookings]);

  return (
    <div className="card">
      <h3>Summary</h3>
      <p className="small">Total Bookings: <strong>{summary.total}</strong></p>
      <p className="small">Total Amount: <strong>₹{summary.amount}</strong></p>
      <p className="small">Most Visited: <strong>{summary.mostVisited}</strong></p>
    </div>
  );
}
