import React from "react";
import { NavLink } from "react-router-dom";

export default function Profile() {
  return (
    <div className="min-h-screen pb-16 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700">
      <header className="flex items-center justify-between p-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-blue-700">
          <i className="mr-2 fas fa-user"></i> Perfil de Usuario
        </h1>
      </header>

      <main className="flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
          <h2 className="mb-6 text-3xl font-bold text-center text-blue-700">
            Información del Usuario
          </h2>
          <p className="mb-4 text-gray-700">
            <strong>Nombre:</strong> Rodrigo Uriel
          </p>
          <p className="mb-4 text-gray-700">
            <strong>Correo:</strong> rodrigo@example.com
          </p>
          <p className="mb-4 text-gray-700">
            <strong>Teléfono:</strong> +52 123 456 7890
          </p>
        </div>
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
