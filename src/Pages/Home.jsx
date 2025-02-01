import React, { useState, useEffect } from "react";
import axios from "axios";
import KanbanBoard from "./KanbanBoard";
import Header from "../components/Header";
import "../styles/Home.css";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", status: "To Do" });

  const token = localStorage.getItem("token"); // Obtener el token

  // 🔹 Cargar tareas del usuario autenticado
  useEffect(() => {
    const fetchTasks = async () => {
      if (!token) return; // No hacer la solicitud si no hay token

      try {
        const response = await axios.get("http://localhost:5000/api/tasks", {
          headers: { Authorization: `Bearer ${token}` }, // 🔥 Importante: Agregar "Bearer "
        });
        setTasks(response.data);
      } catch (error) {
        console.error("Error al obtener las tareas:", error);
      }
    };
    fetchTasks();
  }, [token]);

  // 🔹 Manejar el envío del formulario para agregar una nueva tarea
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      console.error("No hay token disponible, usuario no autenticado.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/tasks", newTask, {
        headers: { Authorization: `Bearer ${token}` }, // 🔥 Importante: Incluir "Bearer "
      });

      setTasks((prevTasks) => [...prevTasks, response.data]);
      setNewTask({ title: "", description: "", status: "To Do" }); // Limpiar formulario
    } catch (error) {
      console.error("Error al crear la tarea:", error);
    }
  };

  // 🔹 Manejar los cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  return (
    <div className="home-container">
     
      <KanbanBoard tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default Home;
