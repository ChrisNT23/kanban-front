import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  const navigate = useNavigate();

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

      <nav className="nav-links">
      <Link to="/Home">Home</Link>
        <Link to="/board">Tareas</Link>
        <Link to="/reports">Reportes</Link>
        <Link to="/tasks">Crear Tarea</Link>
      </nav>

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
