import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Home from "./Pages/Home";
import TaskCreation from "./Pages/TaskCreation"; 
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import KanbanBoard from "./Pages/KanbanBoard";
import Reports from "./Pages/Reports"; 

const App = () => {
  const [tasks, setTasks] = useState([]);

  // Cargar tareas desde el backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error al obtener las tareas:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <Router>
      <HeaderWrapper />
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<TaskCreation />} />
        <Route path="/board" element={<KanbanBoard />} />
        <Route path="/reports" element={<Reports />} /> 
      </Routes>
    </Router>
  );
};

// 📌 Componente para mostrar/ocultar el Header según la ruta
const HeaderWrapper = () => {
  const location = useLocation();
  const hideHeaderRoutes = ["/login", "/register"];

  return !hideHeaderRoutes.includes(location.pathname) ? <Header /> : null;
};

export default App;
