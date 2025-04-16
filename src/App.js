import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import Tickets from "./pages/Tickets"; 
import Profile  from "./pages/Profile";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/tickets" element={<Tickets />} /> 
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}
