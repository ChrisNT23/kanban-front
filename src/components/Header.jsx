import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // Obtener los datos del usuario desde localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("token"); // Eliminar token
    localStorage.removeItem("user");  // Eliminar datos del usuario
    navigate("/login"); // Redirigir a la pantalla de inicio de sesión
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/Home">Kanban</Link>
      </div>

      {/* 📌 Menú hamburguesa */}
      <div className={`menu-toggle ${menuOpen ? "active" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* 📌 Menú de navegación */}
      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link to="/Home" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/reports" onClick={() => setMenuOpen(false)}>Reportes</Link>
        <Link to="/tasks" onClick={() => setMenuOpen(false)}>Crear Tarea</Link>
      </nav>

      {/* 📌 Info del usuario */}
      <div className="user-info">
        {user ? (
          <>
            <span className="username">Hola, {user.nombre} 👋</span>
            <button className="logout-btn" onClick={handleLogout}>Cerrar sesión</button>
          </>
        ) : (
          <Link to="/login">Iniciar sesión</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
