import React, { useState } from 'react';
import NavbarEmpleadoComponent from '../components/NavbarEmpleadoComponent';
import Swal from 'sweetalert2'
import apiService from '../services/services'; // Asegúrate de importar tu servicio
import { useNavigate } from "react-router-dom";

const SolicitudVacaciones = () => {
  const navigate = useNavigate();
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [diasDisponibles, setDiasDisponibles] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const diasHabiles = calcularDiasHabiles(fechaInicio, fechaFin);
    const nuevaSolicitud = {

      sdv_codexp: 1,
      sdv_fecha_solicitud: new Date().toISOString().split('T')[0],
      sdv_desde: fechaInicio,
      sdv_hasta: fechaFin,
      sdv_dias: diasHabiles,
      sdv_estado: "Pendiente Aprobacion" // Ajustar según la lógica de negocio

    };

    try {
      await apiService.postSolicitudVacaciones(nuevaSolicitud);
      Swal.fire({
        title: 'Solicitud de vacaciones ingresada exitosamente',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/DashboardEmpleado");
        }
      });
    } catch (error) {
      console.error('Error al enviar la solicitud de vacaciones:', error);
      // Aquí puedes agregar lógica para manejar el error, como mostrar un mensaje de error
    }
  };

  const calcularDiasHabiles = (desde, hasta) => {
    let start = new Date(desde);
    let end = new Date(hasta);
    let count = 0;
    while (start <= end) {
      const day = start.getDay();
      if (day !== 0 && day !== 6) { // Excluir domingos (0) y sábados (6)
        count++;
      }
      start.setDate(start.getDate() + 1);
    }
    return count;
  };

  return (
    <div>
      <NavbarEmpleadoComponent />
      <div className="titulo">
        <h1>Solicitud de Vacaciones</h1>
      </div>
      <div className="contenedorPadre">
        <div className="contenedorHijo">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fechaInicio">Fecha de Inicio:</label>
              <input
                type="date"
                className="form-control"
                id="fechaInicio"
                name="fechaInicio"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="fechaFin">Fecha de Fin:</label>
              <input
                type="date"
                className="form-control"
                id="fechaFin"
                name="fechaFin"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="diasDisponibles">Total Dias:</label>
              <input disabled
                type="number"
                className="form-control"
                id="diasDisponibles"
                name="diasDisponibles"
                value={calcularDiasHabiles(fechaInicio, fechaFin)} 
                onChange={(e) => setDiasDisponibles(e.target.value)}
                required
              />
            </div>
            <div className="contenedorPadre">
              <button type="submit" className="btn btn-primary btn-lg">
                Solicitar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SolicitudVacaciones;
