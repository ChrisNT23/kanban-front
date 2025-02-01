import React, { useState } from "react";
import axios from "axios";
import "../styles/TaskList.css";

const TaskList = () => {
  const [title, setTitle] = useState(""); // Título de la tarea
  const [description, setDescription] = useState(""); // Descripción de la tarea
  const [tasks, setTasks] = useState([]); // Estado para almacenar las tareas

  // Función para manejar el cambio en el título de la tarea
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // Función para manejar el cambio en la descripción de la tarea
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // Función para agregar una nueva tarea
  const handleAddTask = async () => {
    try {
      const newTask = { title, description, status: "To Do" }; // Definir la tarea con los datos del formulario
      const response = await axios.post("http://localhost:5000/api/tasks", newTask); // Hacer una petición POST al backend
      setTasks((prevTasks) => [...prevTasks, response.data]); // Añadir la nueva tarea a la lista
      setTitle(""); // Limpiar el campo de título
      setDescription(""); // Limpiar el campo de descripción
    } catch (error) {
      console.error("Error al agregar la tarea:", error);
    }
  };

  return (
    <div className="task-list-container">
      <h2>Tareas</h2>
      <div className="task-form">
        <input
          type="text"
          placeholder="Título de la tarea"
          value={title}
          onChange={handleTitleChange}
        />
        <textarea
          placeholder="Descripción de la tarea"
          value={description}
          onChange={handleDescriptionChange}
        />
        <button onClick={handleAddTask}>Agregar tarea</button>
      </div>

      <div className="task-list">
        <h3>Lista de Tareas</h3>
        {tasks.length === 0 ? (
          <p>No hay tareas aún.</p>
        ) : (
          <ul>
            {tasks.map((task) => (
              <li key={task._id}>
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                <p>Status: {task.status}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TaskList;
