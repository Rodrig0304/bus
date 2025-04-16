import React from "react";
import { NavLink } from "react-router-dom";

export default function Tickets() {
  // Datos de ejemplo para "Mis viajes" y "Historial"
  const upcomingTrips = [
    {
      id: 1,
      origin: "Ciudad de México",
      destination: "Guadalajara",
      date: "2025-04-10",
      time: "10:00 AM",
      tickets: 2,
    },
    {
      id: 2,
      origin: "Monterrey",
      destination: "Tijuana",
      date: "2025-04-12",
      time: "3:00 PM",
      tickets: 1,
    },
  ];

  const tripHistory = [
    {
      id: 3,
      origin: "Puebla",
      destination: "Veracruz",
      date: "2025-03-15",
      time: "8:00 AM",
      tickets: 3,
    },
    {
      id: 4,
      origin: "Cancún",
      destination: "Mérida",
      date: "2025-03-20",
      time: "5:00 PM",
      tickets: 1,
    },
  ];

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
          <div className="space-y-4">
            {upcomingTrips.map((trip) => (
              <div
                key={trip.id}
                className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md"
              >
                <div>
                  <p className="font-bold text-gray-700">
                    {trip.origin} → {trip.destination}
                  </p>
                  <p className="text-gray-600">
                    {trip.date} a las {trip.time}
                  </p>
                </div>
                <p className="text-gray-700">Boletos: {trip.tickets}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Lista de "Historial" */}
        <section>
          <h2 className="mb-4 text-xl font-bold text-white">Historial</h2>
          <div className="space-y-4">
            {tripHistory.map((trip) => (
              <div
                key={trip.id}
                className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md"
              >
                <div>
                  <p className="font-bold text-gray-700">
                    {trip.origin} → {trip.destination}
                  </p>
                  <p className="text-gray-600">
                    {trip.date} a las {trip.time}
                  </p>
                </div>
                <p className="text-gray-700">Boletos: {trip.tickets}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

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
