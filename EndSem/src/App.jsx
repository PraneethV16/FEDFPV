import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import TripList from "./pages/TripList.jsx";
import AddBooking from "./pages/AddBooking.jsx";
import BookingHistory from "./pages/BookingHistory.jsx";
import DestinationBookings from "./pages/DestinationBookings.jsx";
import SummaryCard from "./components/SummaryCard.jsx";

import "./App.css"; // <---- IMPORTANT: CSS linked here

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="app-container">
        <main>
          <Routes>
            <Route path="/" element={<TripList />} />
            <Route path="/add" element={<AddBooking />} />
            <Route path="/history" element={<BookingHistory />} />
            <Route path="/destination/:name" element={<DestinationBookings />} />
          </Routes>
        </main>

        <aside className="sidebar">
          <SummaryCard />
        </aside>
      </div>
    </BrowserRouter>
  );
}
