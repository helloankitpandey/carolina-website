"use client";

import { useState } from "react";

export default function ReservationsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [partySize, setPartySize] = useState(2);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [checking, setChecking] = useState(false);
  const [checkingResult, setCheckingResult] = useState<
    { available: boolean; slots?: string[]; message?: string } | null
  >(null);
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<{ id: string; when: string } | null>(null);
  const [error, setError] = useState("");

  async function checkAvailability() {
    setChecking(true);
    setCheckingResult(null);
    setError("");
    try {
      // API implementation
      const res = await fetch("/api/reservations/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          partySize,
          date,
          time,
        }),
      });
      const data = await res.json();
      setCheckingResult(data);
    } catch (err: any) {
      setError("Failed to check availability. Try again.");
    } finally {
      setChecking(false);
    }
  }

  async function submitReservation(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const body = {
        name,
        email,
        phone,
        partySize,
        date,
        time,
        notes,
      };
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message || "Failed to create reservation");
      }
      setConfirmation({ id: data.reservationId, when: `${date} ${time}` });
    } catch (err: any) {
      setError(err.message || "Failed to submit reservation");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative px-4 sm:px-6 md:px-10 py-12 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <p className="text-sm text-emerald-300 uppercase tracking-wide">Reservations</p>
        <h1 className="text-3xl sm:text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
          Book Your Table
        </h1>
        <p className="mt-2 text-neutral-300 max-w-2xl mx-auto">
          Reserve a seat for an unforgettable Carolina dining experience. We recommend booking at least 24
          hours in advance for groups.
        </p>
      </div>

      {confirmation ? (
        <div className="rounded-2xl border border-white/8 bg-black/30 p-6 text-center">
          <h2 className="text-xl font-semibold text-white">Reservation Confirmed</h2>
          <p className="mt-2 text-neutral-300">Reference: <span className="text-emerald-300">{confirmation.id}</span></p>
          <p className="mt-1 text-neutral-300">When: <strong>{confirmation.when}</strong></p>
          <p className="mt-4 text-sm text-neutral-400">We sent a confirmation email to the address provided.</p>
          <div className="mt-6">
            <a href="/" className="inline-block rounded-full px-6 py-2 bg-gradient-to-r from-blue-600 to-emerald-400 text-black font-semibold">Back to Home</a>
          </div>
        </div>
      ) : (
        <form onSubmit={submitReservation} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm text-neutral-300">Name</span>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-md bg-black/20 border border-white/8 px-3 py-2 text-white placeholder:text-neutral-400"
                placeholder="Full name"
              />
            </label>

            <label className="block">
              <span className="text-sm text-neutral-300">Phone</span>
              <input
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 block w-full rounded-md bg-black/20 border border-white/8 px-3 py-2 text-white placeholder:text-neutral-400"
                placeholder="+91 98765 43210"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm text-neutral-300">Email</span>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md bg-black/20 border border-white/8 px-3 py-2 text-white placeholder:text-neutral-400"
                placeholder="you@email.com"
              />
            </label>

            <label className="block">
              <span className="text-sm text-neutral-300">Party size</span>
              <select
                required
                value={partySize}
                onChange={(e) => setPartySize(Number(e.target.value))}
                className="mt-1 block w-full rounded-md bg-black/20 border border-white/8 px-3 py-2 text-white"
              >
                {[1,2,3,4,5,6,7,8,9,10].map((n) => (
                  <option key={n} value={n}>{n} {n===1 ? "person" : "persons"}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
            <label className="block">
              <span className="text-sm text-neutral-300">Date</span>
              <input
                required
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 block w-full rounded-md bg-black/20 border border-white/8 px-3 py-2 text-white"
                min={new Date().toISOString().slice(0,10)}
              />
            </label>

            <label className="block">
              <span className="text-sm text-neutral-300">Time</span>
              <input
                required
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="mt-1 block w-full rounded-md bg-black/20 border border-white/8 px-3 py-2 text-white"
              />
            </label>
          </div>

          <label className="block">
            <span className="text-sm text-neutral-300">Notes (allergies, requests)</span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1 block w-full rounded-md bg-black/20 border border-white/8 px-3 py-2 text-white placeholder:text-neutral-400 min-h-[88px]"
              placeholder="Dietary restrictions or a note for the kitchen"
            />
          </label>

          <div className="flex flex-col sm:flex-row items-stretch gap-3">
            <button
              type="button"
              onClick={checkAvailability}
              disabled={!date || !time || checking}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-black/20 border border-white/8 px-4 py-2 text-sm text-white hover:border-emerald-300 transition"
            >
              {checking ? "Checking…" : "Check Availability"}
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center ml-auto rounded-full bg-gradient-to-r from-blue-600 to-emerald-400 px-4 py-2 text-sm font-semibold text-black shadow-[0_8px_30px_rgba(10,102,255,0.12)]"
            >
              {submitting ? "Booking…" : "Confirm Reservation"}
            </button>
          </div>

          {checkingResult && (
            <div className={`rounded-md p-3 text-sm ${checkingResult.available ? "bg-black/30 border border-emerald-300 text-emerald-200" : "bg-black/30 border border-red-400 text-red-300"}`}>
              {checkingResult.available ? (
                <div>
                  <strong>Available</strong>
                  {checkingResult.slots?.length ? (
                    <p className="text-neutral-300 mt-1">Nearby slots: {checkingResult.slots.join(", ")}</p>
                  ) : null}
                </div>
              ) : (
                <div>
                  <strong>Not available</strong>
                  <p className="text-neutral-300 mt-1">{checkingResult.message ?? "No seats available for the selected time."}</p>
                </div>
              )}
            </div>
          )}

          {error && <p className="text-sm text-red-400">{error}</p>}
        </form>
      )}
    </div>
  );
}
