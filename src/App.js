import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import Tickets from "./pages/Tickets"; 
import Profile  from "./pages/Profile";
import Register from "./pages/Register";

export default function App() {
  // Inicializar admin por defecto si no existe
  React.useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const adminExists = users.some(
      (u) => u.email === "admin@admin.com" && u.password === "admin1234"
    );
    if (!adminExists) {
      users.push({ name: "admin", email: "admin@admin.com", password: "admin1234", puntos: 0 });
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/tickets" element={<Tickets />} /> 
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}
