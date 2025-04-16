import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Menu() {
  const [departureDate, setDepartureDate] = useState(null); // Fecha de salida
  const [returnDate, setReturnDate] = useState(null); // Fecha de regreso (opcional)
  const [origin, setOrigin] = useState(""); // Origen
  const [destination, setDestination] = useState(""); // Destino
  const [isLoading, setIsLoading] = useState(false); // Estado para la animación de carga
  const [searchResults, setSearchResults] = useState([]); // Resultados de búsqueda

  const handleSearch = (e) => {
    e.preventDefault();
    if (!origin || !destination || !departureDate) {
      alert("Por favor, completa los campos obligatorios.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSearchResults([
        {
          id: 1,
          departureTime: "08:00 AM",
          arrivalTime: "12:00 PM",
          duration: "4h",
          seatsAvailable: 10,
          priceTaquilla: "$500",
          priceOnline: "$450",
        },
        {
          id: 2,
          departureTime: "10:00 AM",
          arrivalTime: "02:30 PM",
          duration: "4h 30m",
          seatsAvailable: 5,
          priceTaquilla: "$550",
          priceOnline: "$500",
        },
      ]);
    }, 2000);
  };

  const handleBuy = (id) => {
    alert(`Has comprado el boleto con ID: ${id}`);
  };

  return (
    <div className="min-h-screen pb-16 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700">
      <header className="flex items-center justify-between p-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-blue-700">Roy Viajero</h1>
      </header>

      <main className="p-8">
        <h2 className="mb-6 text-3xl font-bold text-white">Buscar Viajes</h2>
        <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
          <form onSubmit={handleSearch}>
            <div className="mb-4">
              <label className="block mb-2 text-gray-700">
                ¿De dónde sales?
              </label>
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Ingresa tu lugar de salida"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-gray-700">
                ¿A dónde viajas?
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Ingresa tu destino"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-gray-700">
                ¿Cuándo viajas?
              </label>
              <div className="flex flex-wrap gap-4">
                <button
                  type="button"
                  className="flex-1 px-4 py-2 text-center bg-gray-200 rounded-lg"
                  onClick={() => setDepartureDate(new Date())}
                >
                  Hoy
                </button>
                <button
                  type="button"
                  className="flex-1 px-4 py-2 text-center bg-gray-200 rounded-lg"
                  onClick={() =>
                    setDepartureDate(new Date(Date.now() + 86400000))
                  }
                >
                  Mañana
                </button>
                <DatePicker
                  selected={departureDate}
                  onChange={(date) => setDepartureDate(date)}
                  placeholderText="Elegir fecha"
                  className="flex-1 w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-gray-700">
                ¿Cuándo regresas? (opcional)
              </label>
              <DatePicker
                selected={returnDate}
                onChange={(date) => setReturnDate(date)}
                placeholderText="Elegir fecha"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
            >
              Buscar viajes
            </button>
          </form>
        </div>

        {isLoading && (
          <div className="mt-6 text-center text-white">
            <i className="text-4xl fas fa-spinner fa-spin"></i>
            <p className="mt-2">Buscando viajes...</p>
          </div>
        )}

        {!isLoading && searchResults.length > 0 && (
          <div className="w-full max-w-2xl p-4 mt-6 bg-white rounded-lg shadow-lg">
            <h3 className="mb-4 text-xl font-bold text-gray-700">
              Opciones de viaje
            </h3>
            {searchResults.map((result) => (
              <div
                key={result.id}
                className="flex items-center justify-between p-4 mb-4 bg-gray-100 rounded-lg shadow-md"
              >
                <div>
                  <p className="font-bold text-gray-700">
                    {result.departureTime} → {result.arrivalTime}
                  </p>
                  <p className="text-gray-600">Duración: {result.duration}</p>
                  <p className="text-gray-600">
                    Asientos disponibles: {result.seatsAvailable}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-700">
                    Taquilla: {result.priceTaquilla}
                  </p>
                  <p className="text-gray-700">
                    En línea: {result.priceOnline}
                  </p>
                  <button
                    onClick={() => handleBuy(result.id)}
                    className="px-4 py-2 mt-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    Comprar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
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
