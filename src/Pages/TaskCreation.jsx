import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/TaskCreation.css"; // Asegúrate de tener los estilos

const TaskCreation = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]); 
  const [editingTaskId, setEditingTaskId] = useState(null); // ID de la tarea en edición

  // Recuperar el token del usuario autenticado
  const token = localStorage.getItem("token");

  // 🔹 Cargar tareas desde el backend al iniciar
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` }, // Enviar el token
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Error al obtener las tareas:", error);
    }
  };

  // 🔹 Crear o actualizar tarea
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No hay token disponible, usuario no autenticado.");
      return;
    }
  
    try {
      if (editingTaskId) {
        // 🔹 Modo edición: actualizar tarea existente
        const updatedTask = { title, description, status: "To Do" };
  
        const response = await axios.put(
          `http://localhost:5000/api/tasks/${editingTaskId}`,
          updatedTask,
          { headers: { Authorization: `Bearer ${token}` } }
        );
  
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task._id === editingTaskId ? response.data : task))
        );
  
        resetForm();
      } else {
        // 🔹 Modo creación: nueva tarea
        const newTask = { title, description, status: "To Do" };
        const response = await axios.post("http://localhost:5000/api/tasks", newTask, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        setTasks((prevTasks) => [...prevTasks, response.data]);
        resetForm();
      }
    } catch (error) {
      console.error("Error al procesar la tarea:", error.response?.data || error.message);
    }
  };
  
  
  

  // 🔹 Eliminar tarea
  const handleDelete = async (taskId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
      try {
        const token = localStorage.getItem("token");
  
        await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        // 🔥 Filtrar la tarea eliminada del estado
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      } catch (error) {
        console.error("Error al eliminar tarea:", error.response?.data || error.message);
      }
    }
  };
  
  
  
  // 🔹 Cargar datos de tarea en los campos superiores para editar
  const handleEdit = (task) => {
    setTitle(task.title);
    setDescription(task.description);
    setEditingTaskId(task._id); // 🔥 Asegura que el ID de la tarea se guarda bien
  };
  
  

  // 🔹 Cancelar edición
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setEditingTaskId(null);
  };

  return (
    <div className="task-creation-container">
      <h1>{editingTaskId ? "Editar Tarea" : "Crear Nueva Tarea"}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Título de la tarea:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Descripción de la tarea:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="buttonAdd">
          <button type="submit" className="addButton">
            {editingTaskId ? "Actualizar Tarea" : "Agregar Tarea"}
          </button>
          {editingTaskId && (
            <button type="button" className="cancelButton" onClick={resetForm}>
              Cancelar Edición
            </button>
          )}
        </div>
      </form>

      {/* Tabla con las tareas creadas */}
      <h2>Tareas Creadas</h2>
      <table className="task-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td className="action-buttons">
                <button className="edit-btn" onClick={() => handleEdit(task)}>Editar</button>
                <button className="delete-btn" onClick={() => handleDelete(task._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskCreation;
