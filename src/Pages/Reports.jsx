import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../styles/Reports.css";

const Reports = () => {
  const [tasks, setTasks] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")); // Obtener usuario autenticado

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token"); // Obtener token de autenticación
      const response = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (error) {
      console.error("❌ Error al obtener las tareas:", error);
    }
  };

  // 📌 Contar tareas por estado
  const countTasksByStatus = (status) =>
    tasks.filter((task) => task.status === status).length;

  // 📊 Datos para gráficos
  const taskData = [
    { name: "Pendientes", value: countTasksByStatus("To Do"), color: "#e74c3c" },
    { name: "En Progreso", value: countTasksByStatus("In Progress"), color: "#f39c12" },
    { name: "Completadas", value: countTasksByStatus("Done"), color: "#2ecc71" },
  ];

  return (
    <div className="reports-container">
      <h2>📊 Reportes de Tareas</h2>

      <div className="stats-grid">
        {taskData.map((data, index) => (
          <div key={index} className="stat-card" style={{ background: data.color }}>
            <h3>{data.name}</h3>
            <p>{data.value}</p>
          </div>
        ))}
      </div>

      {/* 📌 Gráfico de Tareas en Pie */}
      <div className="chart-container">
        <h3>📊 Distribución de Tareas</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={taskData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {taskData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 📌 Gráfico de Barras */}
      <div className="chart-container">
        <h3>📊 Tareas por Estado</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={taskData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#3498db" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 📌 Lista de Tareas */}
      <div className="task-list">
        <h3>📌 Lista de Tareas</h3>
        {tasks.length > 0 ? (
          <ul>
            {tasks.map((task) => (
              <li key={task._id}>
                <span className={`status ${task.status.toLowerCase()}`}>{task.status}</span>
                <strong>{task.title}</strong> - {task.description}
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay tareas registradas.</p>
        )}
      </div>
    </div>
  );
};

export default Reports;
