import React, { useContext, useState, useEffect } from "react";
import { BookingContext } from "../context/BookingContext";
import { useNavigate } from "react-router-dom";

export default function AddBooking() {
  const { addBooking, trips, fetchAll } = useContext(BookingContext);
  const navigate = useNavigate();

  // form stores both tripId and visible fields
  const [form, setForm] = useState({
    name: "",
    tripId: "",       // selected trip id
    from: "",         // origin
    destination: "",  // destination (auto)
    date: "",
    price: ""         // price (auto)
  });

  // if trips are not yet loaded in context, try to fetch (safe-guard)
  useEffect(() => {
    if (!trips || trips.length === 0) fetchAll?.();
  }, [trips, fetchAll]);

  // when user selects a trip, auto-fill fields from that trip object
  const handleTripChange = (e) => {
    const id = e.target.value;
    if (!id) {
      setForm({
        ...form,
        tripId: "",
        from: "",
        destination: "",
        price: ""
      });
      return;
    }

    // tripId stored as number if trips have numeric ids
    const trip = trips.find(t => String(t.id) === String(id));
    if (trip) {
      setForm({
        ...form,
        tripId: trip.id,
        from: trip.from || "",                 // if trip.from exists use it
        destination: trip.destination || "",
        price: trip.price !== undefined ? String(trip.price) : ""
      });
    } else {
      // fallback reset
      setForm({
        ...form,
        tripId: id,
        from: "",
        destination: "",
        price: ""
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // minimal validation
    if (!form.name || !form.destination || !form.date) {
      alert("Please fill name, destination and date.");
      return;
    }

    // Build booking payload; include tripId if available for reference
    const payload = {
      name: form.name,
      from: form.from,
      destination: form.destination,
      date: form.date,
      price: Number(form.price) || 0,
      tripId: form.tripId || null
    };

    try {
      await addBooking(payload);
      alert("Booking added successfully.");
      navigate("/history");
    } catch (err) {
      console.error(err);
      alert("Failed to add booking. Check console.");
    }
  };

  return (
    <div>
      <h2>Add Booking</h2>

      <div className="card">
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10 }}>
          <input
            name="name"
            className="input"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            required
          />

          {/* Trip selector: value is trip id */}
          <select
            name="tripId"
            value={form.tripId}
            onChange={handleTripChange}
            className="input"
          >
            <option value="">-- Select Trip (auto-fill fields) --</option>
            {trips.map(t => (
              <option key={t.id} value={t.id}>
                {t.from ? `${t.from} → ${t.destination}` : t.destination} — ₹{t.price}
              </option>
            ))}
          </select>

          {/* From (origin) — auto-filled if trip has it, but editable */}
          <input
            name="from"
            className="input"
            placeholder="From (origin)"
            value={form.from}
            onChange={handleChange}
          />

          {/* Destination — auto-filled and readonly (you can remove readOnly if you want to edit) */}
          <input
            name="destination"
            className="input"
            placeholder="Destination"
            value={form.destination}
            onChange={handleChange}
            readOnly
            required
          />

          {/* Date */}
          <input
            type="date"
            name="date"
            className="input"
            value={form.date}
            onChange={handleChange}
            required
          />

          {/* Price — auto-filled and readonly */}
          <input
            name="price"
            className="input"
            placeholder="Price (auto if trip selected)"
            value={form.price}
            onChange={handleChange}
            readOnly
          />

          <div style={{ display: "flex", gap: 8 }}>
            <button className="button" type="submit">
              Add Booking
            </button>

            <button
              type="button"
              className="button"
              style={{ background: "#718096" }}
              onClick={() =>
                setForm({
                  name: "",
                  tripId: "",
                  from: "",
                  destination: "",
                  date: "",
                  price: ""
                })
              }
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
