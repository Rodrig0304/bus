import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (user.trim() && pass.trim()) {
      navigate("/menu");
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-3xl font-bold text-center text-blue-700">
          Iniciar Sesión
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Usuario</label>
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Ingresa tu usuario"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Contraseña</label>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Ingresa tu contraseña"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}
