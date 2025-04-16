import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    const user = { name, email, password };
    localStorage.setItem("user", JSON.stringify(user));

    alert("Cuenta creada con éxito.");
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700">
      <h1 className="mb-6 text-4xl font-bold text-white">Crear Cuenta</h1>
      <form
        onSubmit={handleRegister}
        className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Nombre Completo</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Ingresa tu nombre"
          />
        </div>
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
            placeholder="Crea una contraseña"
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
            placeholder="Confirma tu contraseña"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
        >
          Crear Cuenta
        </button>
      </form>

      <div className="mt-4">
        <p className="text-white">
          ¿Ya tienes una cuenta?{" "}
          <button
            onClick={() => navigate("/login")}
            className="font-bold text-yellow-300 hover:underline"
          >
            Iniciar Sesión
          </button>
        </p>
      </div>
    </div>
  );
}
