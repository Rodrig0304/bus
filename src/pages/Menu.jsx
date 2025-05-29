import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import logo from "../images/logo.PNG";

export default function Menu() {
  const [departureDate, setDepartureDate] = useState(null); // Fecha de salida
  const [returnDate, setReturnDate] = useState(null); // Fecha de regreso (opcional)
  const [origin, setOrigin] = useState(""); // Origen
  const [destination, setDestination] = useState(""); // Destino
  const [isLoading, setIsLoading] = useState(false); // Estado para la animación de carga
  const [searchResults, setSearchResults] = useState([]); // Resultados de búsqueda
  const [selectedTrip, setSelectedTrip] = useState(null); // Viaje seleccionado
  const [selectedSeat, setSelectedSeat] = useState(null); // Asiento seleccionado
  const [passengerName, setPassengerName] = useState(""); // Nombre del pasajero
  const [useLoggedInUser, setUseLoggedInUser] = useState(true); // Usar el nombre del usuario logueado
  const [loggedInUserName] = useState("Rodrigo Vega"); // Nombre del usuario logueado
  const [cardRegistered, setCardRegistered] = useState(false); // Si hay tarjeta registrada
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const resultsRef = useRef(null);
  const navigate = useNavigate();

  const cities = [
    "Ciudad Mante",
    "Tampico",
    "Reynosa",
    "Nuevo Laredo",
    "Matamoros",
    "Ciudad Victoria",
    "Altamira",
    "San Fernando",
    "El Mante",
    // SLP
    "San Luis Potosí",
    "Soledad de Graciano Sánchez",
    "Matehuala",
    "Rioverde",
    "Ciudad Valles",
    "Tamazunchale",
    "Ébano",
    // Monterrey
    "Monterrey",
    "San Nicolás de los Garza",
    "Guadalupe",
    "Apodaca",
    "Santa Catarina",
    "San Pedro Garza García",
    "Escobedo",
    "General Escobedo",
  ];

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
          seats: Array(40)
            .fill(false)
            .map((_, i) => (i % 5 === 0 ? true : false)),
        },
        {
          id: 2,
          departureTime: "10:00 AM",
          arrivalTime: "02:30 PM",
          duration: "4h 30m",
          seatsAvailable: 5,
          priceTaquilla: "$550",
          priceOnline: "$500",
          seats: Array(40)
            .fill(false)
            .map((_, i) => (i % 6 === 0 ? true : false)),
        },
        {
          id: 3,
          departureTime: "12:00 PM",
          arrivalTime: "04:00 PM",
          duration: "4h",
          seatsAvailable: 15,
          priceTaquilla: "$520",
          priceOnline: "$470",
          seats: Array(40)
            .fill(false)
            .map((_, i) => (i % 7 === 0 ? true : false)),
        },
        {
          id: 4,
          departureTime: "02:00 PM",
          arrivalTime: "06:30 PM",
          duration: "4h 30m",
          seatsAvailable: 8,
          priceTaquilla: "$560",
          priceOnline: "$510",
          seats: Array(40)
            .fill(false)
            .map((_, i) => (i % 8 === 0 ? true : false)),
        },
        {
          id: 5,
          departureTime: "04:00 PM",
          arrivalTime: "08:00 PM",
          duration: "4h",
          seatsAvailable: 12,
          priceTaquilla: "$530",
          priceOnline: "$480",
          seats: Array(40)
            .fill(false)
            .map((_, i) => (i % 9 === 0 ? true : false)),
        },
      ]);

      resultsRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 2000);
  };

  const handleSelectTrip = (trip) => {
    setSelectedTrip(trip);
  };

  const handleSelectSeat = (seatIndex) => {
    setSelectedSeat(seatIndex);
  };

  // Guardar y cargar tarjetas desde localStorage
  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem("cards")) || [];
    if (savedCards.length > 0) {
      setCardRegistered(true);
      setCardDetails(savedCards[savedCards.length - 1]);
    }
  }, []);

  const handleRegisterCard = (e) => {
    e.preventDefault();
    const cardNumber = cardDetails.number.replace(/-/g, "");
    if (!/^\d{16}$/.test(cardNumber)) {
      alert("El número de tarjeta debe tener exactamente 16 dígitos.");
      return;
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardDetails.expiry)) {
      alert("La fecha de expiración debe estar en el formato MM/AA.");
      return;
    }
    if (!/^\d{3}$/.test(cardDetails.cvv)) {
      alert("El CVV debe tener exactamente 3 dígitos.");
      return;
    }
    setCardRegistered(true);
    // Guardar tarjeta en localStorage
    const cards = JSON.parse(localStorage.getItem("cards")) || [];
    cards.push(cardDetails);
    localStorage.setItem("cards", JSON.stringify(cards));
    alert("Tarjeta registrada con éxito.");
  };

  const handleCardNumberChange = (e) => {
    const input = e.target.value.replace(/-/g, "");
    if (/^\d*$/.test(input) && input.length <= 16) {
      const formatted = input.match(/.{1,4}/g)?.join("-") || "";
      setCardDetails({ ...cardDetails, number: formatted });
    }
  };

  const handleExpiryChange = (e) => {
    const input = e.target.value.replace(/\//g, "");
    if (/^\d*$/.test(input) && input.length <= 4) {
      const formatted =
        input.length > 2 ? `${input.slice(0, 2)}/${input.slice(2)}` : input;
      setCardDetails({ ...cardDetails, expiry: formatted });
    }
  };

  const handleCVVChange = (e) => {
    const input = e.target.value;
    if (/^\d*$/.test(input) && input.length <= 3) {
      setCardDetails({ ...cardDetails, cvv: input });
    }
  };

  const handleConfirmTicket = () => {
    if (!cardRegistered) {
      alert("Por favor, registra una tarjeta antes de confirmar la compra.");
      return;
    }

    const finalPassengerName = useLoggedInUser
      ? loggedInUserName
      : passengerName;

    // Guardar boleto en localStorage
    const ticket = {
      origin,
      destination,
      date: departureDate?.toISOString().split("T")[0],
      time: selectedTrip?.departureTime,
      seat: selectedSeat,
      passenger: finalPassengerName,
    };
    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
    tickets.push(ticket);
    localStorage.setItem("tickets", JSON.stringify(tickets));

    alert(
      `Boleto confirmado para ${finalPassengerName} en el asiento ${
        selectedSeat + 1
      }.`
    );

    setSelectedTrip(null);
    setSelectedSeat(null);
    setPassengerName("");
    setCardDetails({ number: "", name: "", expiry: "", cvv: "" });
    setCardRegistered(false);
    navigate("/tickets");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700">
      <header className="flex items-center justify-between w-full p-4 bg-white shadow-md">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-10 mr-2" />
          <h1 className="text-2xl font-bold text-blue-700">Roy Viajero</h1>
        </div>
      </header>

      <main className="flex-1 w-full max-w-2xl p-6 mx-auto mt-4 mb-16 overflow-y-auto bg-white rounded-lg shadow-lg">
        {!selectedTrip ? (
          <>
            <h2 className="mb-6 text-3xl font-bold text-center text-blue-700">
              Buscar Viajes
            </h2>
            <form onSubmit={handleSearch}>
              <div className="mb-4">
                <label className="block mb-2 text-gray-700">
                  ¿De dónde sales?
                </label>
                <select
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Selecciona ciudad de origen</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-gray-700">
                  ¿A dónde viajas?
                </label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Selecciona ciudad de destino</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
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

            <div ref={resultsRef}>
              {!isLoading && searchResults.length > 0 && (
                <div className="mt-6">
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
                        <p className="text-gray-600">
                          Duración: {result.duration}
                        </p>
                        <p className="text-gray-600">
                          Asientos disponibles: {result.seatsAvailable}
                        </p>
                      </div>
                      <button
                        onClick={() => handleSelectTrip(result)}
                        className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                      >
                        Seleccionar
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <h2 className="mb-6 text-3xl font-bold text-center text-blue-700">
              Seleccionar Asiento
            </h2>

            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-full mb-6">
                <div className="flex items-center justify-center w-16 h-16 text-white bg-gray-700 rounded-full">
                  <i className="text-2xl fas fa-steering-wheel"></i>
                </div>
                <p className="ml-4 font-bold text-gray-700">Conductor</p>
              </div>

              <div className="flex flex-col gap-4">
                {Array.from({ length: 10 }).map((_, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="flex items-center justify-center gap-8"
                  >
                    <div className="flex gap-4">
                      {selectedTrip.seats
                        .slice(rowIndex * 4, rowIndex * 4 + 2)
                        .map((isOccupied, seatIndex) => (
                          <button
                            key={seatIndex}
                            disabled={isOccupied}
                            onClick={() =>
                              handleSelectSeat(rowIndex * 4 + seatIndex)
                            }
                            className={`w-12 h-12 rounded-lg ${
                              isOccupied
                                ? "bg-red-500 cursor-not-allowed"
                                : "bg-green-500 hover:bg-green-600"
                            }`}
                          >
                            {rowIndex * 4 + seatIndex + 1}
                          </button>
                        ))}
                    </div>

                    <div className="w-8"></div>

                    <div className="flex gap-4">
                      {selectedTrip.seats
                        .slice(rowIndex * 4 + 2, rowIndex * 4 + 4)
                        .map((isOccupied, seatIndex) => (
                          <button
                            key={seatIndex}
                            disabled={isOccupied}
                            onClick={() =>
                              handleSelectSeat(rowIndex * 4 + 2 + seatIndex)
                            }
                            className={`w-12 h-12 rounded-lg ${
                              isOccupied
                                ? "bg-red-500 cursor-not-allowed"
                                : "bg-green-500 hover:bg-green-600"
                            }`}
                          >
                            {rowIndex * 4 + 2 + seatIndex + 1}
                          </button>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedSeat !== null && (
              <>
                <h3 className="mb-4 text-xl font-bold text-gray-700">
                  Detalles del Boleto
                </h3>

                <div className="mb-4">
                  <p className="text-gray-700">
                    <strong>Origen:</strong> {origin}
                  </p>
                  <p className="text-gray-700">
                    <strong>Destino:</strong> {destination}
                  </p>
                  <p className="text-gray-700">
                    <strong>Fecha de salida:</strong>{" "}
                    {departureDate?.toLocaleDateString()}
                  </p>
                  <p className="text-gray-700">
                    <strong>Hora de salida:</strong>{" "}
                    {selectedTrip?.departureTime}
                  </p>
                  <p className="text-gray-700">
                    <strong>Hora de llegada:</strong>{" "}
                    {selectedTrip?.arrivalTime}
                  </p>
                  <p className="text-gray-700">
                    <strong>Precio:</strong> {selectedTrip?.priceOnline}
                  </p>
                </div>

                <div className="mb-4">
                  <label className="block mb-2 text-gray-700">
                    ¿Quién será el pasajero?
                  </label>
                  <select
                    value={useLoggedInUser ? "loggedInUser" : "custom"}
                    onChange={(e) =>
                      setUseLoggedInUser(e.target.value === "loggedInUser")
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="loggedInUser">{loggedInUserName}</option>
                    <option value="custom">Otro pasajero</option>
                  </select>
                </div>
                {!useLoggedInUser && (
                  <div className="mb-4">
                    <label className="block mb-2 text-gray-700">
                      Nombre del pasajero
                    </label>
                    <input
                      type="text"
                      value={passengerName}
                      onChange={(e) => setPassengerName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      placeholder="Ingresa el nombre del pasajero"
                    />
                  </div>
                )}

                {!cardRegistered ? (
                  <>
                    <h3 className="mb-4 text-xl font-bold text-gray-700">
                      Registrar Tarjeta
                    </h3>
                    <form onSubmit={handleRegisterCard}>
                      <div className="mb-4">
                        <label className="block mb-2 text-gray-700">
                          Número de tarjeta
                        </label>
                        <input
                          type="text"
                          value={cardDetails.number}
                          onChange={handleCardNumberChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          placeholder="Ingresa el número de tarjeta"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 text-gray-700">
                          Nombre en la tarjeta
                        </label>
                        <input
                          type="text"
                          value={cardDetails.name}
                          onChange={(e) =>
                            setCardDetails({
                              ...cardDetails,
                              name: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          placeholder="Ingresa el nombre en la tarjeta"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 text-gray-700">
                          Fecha de expiración
                        </label>
                        <input
                          type="text"
                          value={cardDetails.expiry}
                          onChange={handleExpiryChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          placeholder="MM/AA"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 text-gray-700">CVV</label>
                        <input
                          type="text"
                          value={cardDetails.cvv}
                          onChange={handleCVVChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          placeholder="Ingresa el CVV"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
                      >
                        Registrar Tarjeta
                      </button>
                    </form>
                  </>
                ) : (
                  <>
                    <h3 className="mb-4 text-xl font-bold text-gray-700">
                      Tarjeta Registrada
                    </h3>
                    <div className="mb-4">
                      <p className="text-gray-700">
                        <strong>Número:</strong> **** **** ****{" "}
                        {cardDetails.number.slice(-4)}
                      </p>
                      <p className="text-gray-700">
                        <strong>Nombre:</strong> {cardDetails.name}
                      </p>
                      <p className="text-gray-700">
                        <strong>Expiración:</strong> {cardDetails.expiry}
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setCardRegistered(false)}
                        className="flex-1 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
                      >
                        Remover Tarjeta
                      </button>
                      <button
                        onClick={() => {
                          setCardDetails({
                            number: "",
                            name: "",
                            expiry: "",
                            cvv: "",
                          });
                          setCardRegistered(false);
                        }}
                        className="flex-1 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                      >
                        Registrar Otra Tarjeta
                      </button>
                    </div>
                  </>
                )}

                <button
                  onClick={handleConfirmTicket}
                  className="w-full py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Confirmar Boleto
                </button>
              </>
            )}
          </>
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
