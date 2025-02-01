import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    celular: "",
    genero: "",
    pais: "",
    ciudad: "",
    correo: "",
    contraseña: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/auth/register", formData);
      alert("Registro exitoso. Ahora puedes iniciar sesión.");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Error en el registro.");
    }
  };

  return (
    <div className="register-container">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
        <input type="text" name="apellido" placeholder="Apellido" value={formData.apellido} onChange={handleChange} required />
        <input type="tel" name="celular" placeholder="Número Celular" value={formData.celular} onChange={handleChange} required />
        <select name="genero" value={formData.genero} onChange={handleChange} required>
          <option value="">Seleccione Género</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="Otro">Otro</option>
        </select>
        <input type="text" name="pais" placeholder="País" value={formData.pais} onChange={handleChange} required />
        <input type="text" name="ciudad" placeholder="Ciudad" value={formData.ciudad} onChange={handleChange} required />
        <input type="email" name="correo" placeholder="Correo Electrónico" value={formData.correo} onChange={handleChange} required />
        <input type="password" name="contraseña" placeholder="Contraseña" value={formData.contraseña} onChange={handleChange} required />
        <button type="submit">Registrarse</button>
      </form>
      <p>¿Ya tienes cuenta? <span className="link" onClick={() => navigate("/login")}>Inicia sesión aquí</span></p>
    </div>
  );
};

export default Register;
