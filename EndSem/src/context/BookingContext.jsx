import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [bRes, tRes] = await Promise.all([api.get('/bookings'), api.get('/trips')]);
      setBookings(bRes.data || []);
      setTrips(tRes.data || []);
    } catch (err) {
      console.error('Failed loading data', err);
    }
  };

  const addBooking = async (booking) => {
    try {
      // json-server will assign id automatically
      const res = await api.post('/bookings', booking);
      setBookings(prev => [...prev, res.data]);
      return res.data;
    } catch (err) {
      console.error('Add booking failed', err);
      throw err;
    }
  };

  const deleteBooking = async (id) => {
    try {
      await api.delete(`/bookings/${id}`);
      setBookings(prev => prev.filter(b => b.id !== id));
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  return (
    <BookingContext.Provider value={{ bookings, trips, addBooking, deleteBooking, fetchAll }}>
      {children}
    </BookingContext.Provider>
  );
};
