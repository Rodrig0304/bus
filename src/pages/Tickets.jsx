import TicketQRCode from "../components/TicketQRCode";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Tickets() {
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [tripHistory, setTripHistory] = useState([]);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const upcoming = tickets.filter((ticket) => {
      const ticketDate = new Date(ticket.date);
      ticketDate.setHours(0, 0, 0, 0);
      return ticketDate >= today;
    });
    let history = tickets.filter((ticket) => {
      const ticketDate = new Date(ticket.date);
      ticketDate.setHours(0, 0, 0, 0);
      return ticketDate < today;
    });

    if (history.length === 0) {
      history = [
        {
          origin: "Tampico",
          destination: "Monterrey",
          date: "2025-05-10",
          time: "08:00 AM",
          seat: 12,
          passenger: "Rodrigo Vega",
        },
        {
          origin: "San Luis Potosí",
          destination: "Reynosa",
          date: "2025-05-15",
          time: "09:30 AM",
          seat: 5,
          passenger: "Rodrigo Vega",
        },
      ];
    }
    setUpcomingTrips(upcoming);
    setTripHistory(history);
  }, []);

  const handleShowTicket = (trip) => {
    setSelectedTicket(tripToTicket(trip));
    setShowTicketModal(true);
  };
  const handleCloseTicket = () => {
    setShowTicketModal(false);
    setSelectedTicket(null);
  };
  function tripToTicket(trip) {
    // Asegura que el objeto tenga los campos esperados por el QR
    return {
      origin: trip.origin,
      destination: trip.destination,
      date: trip.date,
      time: trip.time,
      seat: trip.seat,
      passenger: trip.passenger,
    };
  }

  return (
    <div className="min-h-screen pb-16 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700">
      <header className="flex items-center justify-between p-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-blue-700">
          <i className="mr-2 fas fa-ticket-alt"></i> Mis Boletos
        </h1>
      </header>

      <main className="px-4 mt-6 space-y-8">
        {/* Lista de "Mis viajes" */}
        <section>
          <h2 className="mb-4 text-xl font-bold text-white">Mis viajes</h2>
          <div className="space-y-4 max-h-[300px] overflow-y-auto">
            {upcomingTrips.length === 0 ? (
              <p className="text-white">No tienes viajes próximos.</p>
            ) : (
              upcomingTrips.map((trip, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md"
                >
                  <div>
                    <p className="font-bold text-gray-700">
                      {trip.origin} → {trip.destination}
                    </p>
                    <p className="text-gray-600">
                      {trip.date} a las {trip.time}
                    </p>
                    <p className="text-gray-600">Pasajero: {trip.passenger}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <p className="text-gray-700">Asiento: {trip.seat + 1}</p>
                    <button
                      className="px-3 py-1 text-sm text-white bg-green-600 rounded hover:bg-green-700"
                      onClick={() => handleShowTicket(trip)}
                    >
                      Detalles
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
        <section>
          <h2 className="mb-4 text-xl font-bold text-white">Historial</h2>
          <div className="space-y-4 max-h-[300px] overflow-y-auto">
            {tripHistory.length === 0 ? (
              <p className="text-white">No hay historial de viajes.</p>
            ) : (
              tripHistory.map((trip, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md"
                >
                  <div>
                    <p className="font-bold text-gray-700">
                      {trip.origin} → {trip.destination}
                    </p>
                    <p className="text-gray-600">
                      {trip.date} a las {trip.time}
                    </p>
                    <p className="text-gray-600">Pasajero: {trip.passenger}</p>
                  </div>
                  <p className="text-gray-700">Asiento: {trip.seat + 1}</p>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      {/* Modal de detalles del boleto */}
      {showTicketModal && selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-md p-8 bg-white rounded-lg">
            <button
              onClick={handleCloseTicket}
              className="absolute text-2xl text-gray-500 top-2 right-2 hover:text-red-600"
            >
              ×
            </button>
            <h3 className="mb-4 text-xl font-bold text-center text-blue-700">
              Detalles del Boleto
            </h3>
            <div className="flex flex-col items-center gap-4">
              <div className="w-full max-w-xs p-4 border border-blue-300 shadow-lg rounded-xl bg-gradient-to-br from-blue-100 via-blue-200 to-blue-50">
                <div className="flex flex-col items-center mb-2">
                  <TicketQRCode value={JSON.stringify(selectedTicket)} />
                  <span className="mt-2 text-xs text-gray-500">
                    Escanea este código QR al abordar
                  </span>
                </div>
                <div className="text-center">
                  <p className="mb-1 text-lg font-bold text-blue-700">
                    {selectedTicket.origin}{" "}
                    <span className="text-gray-500">→</span>{" "}
                    {selectedTicket.destination}
                  </p>
                  <p className="mb-1 text-sm text-gray-700">
                    <strong>Fecha:</strong> {selectedTicket.date} &nbsp;{" "}
                    <strong>Hora:</strong> {selectedTicket.time}
                  </p>
                  <p className="mb-1 text-sm text-gray-700">
                    <strong>Pasajero:</strong> {selectedTicket.passenger}
                  </p>
                  <p className="text-sm font-semibold text-blue-700">
                    Asiento: {selectedTicket.seat + 1}
                  </p>
                </div>
              </div>
              <button
                onClick={handleCloseTicket}
                className="px-4 py-2 mt-2 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="fixed bottom-0 left-0 right-0 flex justify-around p-4 shadow-lg bg-gradient-to-r from-gray-100 to-gray-300">
        <NavLink
          to="/menu"
          className={({ isActive }) =>
            `flex flex-col items-center text-sm ${
              isActive ? "text-blue-700 font-bold" : "text-gray-600"
            }`
          }
        >
          <i className="mb-1 text-2xl fas fa-home"></i>
          Menú
        </NavLink>

        <NavLink
          to="/tickets"
          className={({ isActive }) =>
            `flex flex-col items-center text-sm ${
              isActive ? "text-blue-700 font-bold" : "text-gray-600"
            }`
          }
        >
          <i className="mb-1 text-2xl fas fa-ticket-alt"></i>
          Mis viajes
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex flex-col items-center text-sm ${
              isActive ? "text-blue-700 font-bold" : "text-gray-600"
            }`
          }
        >
          <i className="mb-1 text-2xl fas fa-user"></i>
          Perfil
        </NavLink>
      </footer>
    </div>
  );
}
