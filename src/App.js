import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Home from "./Pages/Home";
import TaskCreation from "./Pages/TaskCreation"; // Importa TaskCreation
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import KanbanBoard from "./Pages/KanbanBoard";
/*import Reports from "./Pages/Reports";
<Route path="/reports" element={<Reports />} />*/

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
      <Header />
      <Routes>
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<TaskCreation />} />
        <Route path="/board" element={<KanbanBoard />} />
        
      </Routes>
    </Router>
  );
};

export default App;
