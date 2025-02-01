import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "../styles/Kanban.css";

const KanbanBoard = ({ tasks, setTasks }) => {
  const navigate = useNavigate();

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const token = localStorage.getItem("token"); // 🔥 Obtener el token de autenticación
    if (!token) {
      console.error("No hay token, el usuario no está autenticado");
      return;
    }

    const updatedTasks = [...tasks];
    const movedTask = updatedTasks.find((task) => task._id === result.draggableId);
    if (!movedTask) return;

    movedTask.status = result.destination.droppableId;
    setTasks(updatedTasks); // Actualizar la UI de inmediato

    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${result.draggableId}`,
        { status: movedTask.status },
        {
          headers: { Authorization: `Bearer ${token}` }, // 🔥 Enviar el token en la cabecera
        }
      );
    } catch (error) {
      console.error("Error al actualizar la tarea:", error.response?.data || error.message);
    }
  };


  return (
    <div className="kanban-container">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanban-board">
          {["To Do", "In Progress", "Done"].map((status) => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <div className="column" {...provided.droppableProps} ref={provided.innerRef}>
                  <h3>{status}</h3>
                  {tasks.filter((task) => task.status === status).map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                      {(provided) => (
                        <div
                          className="task"
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <h4>{task.title}</h4>
                          <p>{task.description}</p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {/* 📌 Botón Flotante para Crear Nueva Tarea con Tooltip */}
      <div className="tooltip-container">
        <button className="floating-button" onClick={() => navigate("/tasks")}>
          +
        </button>
        <span className="tooltip-text">Crear Tarea</span>
      </div>
    </div>
  );
};

export default KanbanBoard;
