import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    //pendieete de revisar Obtener los datos del usuario desde localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      storedUser &&
      storedUser.email === email &&
      storedUser.password === password
    ) {
      alert("Inicio de sesión exitoso.");
      navigate("/menu");
    } else {
      alert("Correo o contraseña incorrectos.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700">
      <h1 className="mb-6 text-4xl font-bold text-white">Iniciar Sesión</h1>
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Correo Electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Ingresa tu correo"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

      <div className="mt-4">
        <p className="text-white">
          ¿No tienes una cuenta?{" "}
          <button
            onClick={() => navigate("/register")}
            className="font-bold text-yellow-300 hover:underline"
          >
            Crear una cuenta
          </button>
        </p>
      </div>
    </div>
  );
}
