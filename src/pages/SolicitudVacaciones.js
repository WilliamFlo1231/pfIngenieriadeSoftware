import React from 'react';
import NavbarComponent from '../components/NavbarComponent';

const SolicitudVacaciones = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes manejar la lógica de envío del formulario
    console.log('Formulario enviado');
  };

  return (
    <div>
      <NavbarComponent />
      <div className="titulo">
        <h1>Solicitud de Vacaciones</h1>
      </div>
      <div className="contenedorPadre">
        <div className="contenedorHijo">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="diasDisponibles">Días disponibles:</label>
              <input type="number" className="form-control" id="diasDisponibles" name="diasDisponibles" required />
            </div>

            <div className="form-group">
              <label htmlFor="fechaInicio">Fecha de Inicio:</label>
              <input type="date" className="form-control" id="fechaInicio" name="fechaInicio" required />
            </div>

            <div className="form-group">
              <label htmlFor="fechaFin">Fecha de Fin:</label>
              <input type="date" className="form-control" id="fechaFin" name="fechaFin" required />
            </div>
            <div className="contenedorPadre">
              <button type="submit" className="btn btn-primary btn-lg">
                Solicitar
              </button></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SolicitudVacaciones;