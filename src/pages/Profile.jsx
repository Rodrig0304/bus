import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Rodrigo Vega");
  const [userEmail, setUserEmail] = useState("rodrigo.vega@example.com");
  const [userPin, setUserPin] = useState("1234");
  const [points, setPoints] = useState(150); // Puntos acumulados por boletos comprados
  const [isEditing, setIsEditing] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEditProfile = (e) => {
    e.preventDefault();
    if (!/^\d{4}$/.test(userPin)) {
      alert("El PIN debe ser un número de 4 dígitos.");
      return;
    }
    setIsEditing(false);
    alert("Datos actualizados con éxito.");
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }
    alert("Contraseña actualizada con éxito.");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer."
    );
    if (confirmDelete) {
      alert("Cuenta eliminada con éxito.");
    }
  };

  const handleLogout = () => {
    alert("Sesión cerrada con éxito.");
    navigate("/");
  };

  return (
    <div className="min-h-screen pb-16 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700">
      <header className="flex items-center justify-between p-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-blue-700">
          <i className="mr-2 fas fa-user"></i> Perfil de Usuario
        </h1>
      </header>

      <main className="flex flex-col items-center justify-center p-8">
        <h2 className="mb-6 text-3xl font-bold text-white">Mi Perfil</h2>

        <div className="w-full max-w-md p-6 mb-6 bg-white rounded-lg shadow-md">
          <h3 className="mb-4 text-xl font-bold text-gray-700">
            Información del Usuario
          </h3>
          <p className="text-gray-700">
            <strong>Nombre:</strong> {userName}
          </p>
          <p className="text-gray-700">
            <strong>Correo:</strong> {userEmail}
          </p>
          <p className="text-gray-700">
            <strong>PIN:</strong> {userPin}
          </p>
          <p className="text-gray-700">
            <strong>Puntos acumulados:</strong> {points}
          </p>
        </div>

        {isEditing ? (
          <form
            onSubmit={handleEditProfile}
            className="w-full max-w-md p-6 mb-6 bg-white rounded-lg shadow-md"
          >
            <h3 className="mb-4 text-xl font-bold text-gray-700">
              Editar Datos
            </h3>
            <div className="mb-4">
              <label className="block mb-2 text-gray-700">Nombre</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-gray-700">Correo</label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-gray-700">PIN</label>
              <input
                type="text"
                value={userPin}
                onChange={(e) => setUserPin(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="4 dígitos"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
            >
              Guardar Cambios
            </button>
          </form>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="w-full max-w-md py-2 mb-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Editar Datos
          </button>
        )}

        <form
          onSubmit={handleChangePassword}
          className="w-full max-w-md p-6 mb-6 bg-white rounded-lg shadow-md"
        >
          <h3 className="mb-4 text-xl font-bold text-gray-700">
            Cambiar Contraseña
          </h3>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Nueva Contraseña</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
          >
            Cambiar Contraseña
          </button>
        </form>

        <button
          onClick={handleDeleteAccount}
          className="w-full max-w-md py-2 mb-4 text-white bg-red-600 rounded-lg hover:bg-red-700"
        >
          Eliminar Cuenta
        </button>

        <button
          onClick={handleLogout}
          className="w-full max-w-md py-2 text-white bg-gray-600 rounded-lg hover:bg-gray-700"
        >
          Cerrar Sesión
        </button>
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
