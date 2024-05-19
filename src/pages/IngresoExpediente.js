import React, { useState } from 'react';
import NavbarComponent from '../components/NavbarComponent';
import Swal from 'sweetalert2'


function IngresoExpediente() {
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [planilla, setPlanilla] = useState('');
  const [jornada, setJornada] = useState('');
  const [formaPago, setFormaPago] = useState('');
  const [plaza, setPlaza] = useState(''); 
  const [tipoContrato, setTipoContrato] = useState('');
  const [sexo, setSexo] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [identificacion, setIdentificacion] = useState('');
  const [cuentaBanco, setCuentaBanco] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [descuentaRenta, setDescuentaRenta] = useState(false);
  const [descuentaSeguroSocial, setDescuentaSeguroSocial] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      nombres.trim() === '' ||
      apellidos.trim() === '' ||
      planilla.trim() === '' ||
      jornada.trim() === '' ||
      formaPago.trim() === '' ||
      tipoContrato.trim() === '' ||
      plaza.trim() === '' ||
      sexo.trim() === '' ||
      fechaNacimiento.trim() === '' ||
      identificacion.trim() === '' ||
      cuentaBanco.trim() === '' ||
      fechaInicio.trim() === ''
    ) {
      Swal.fire({
        title: 'Todos los campos son obligatorios',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      });
      return;
    }
    console.log({
      nombres,
      apellidos,
      planilla,
      jornada,
      formaPago,
      tipoContrato,
      sexo,
      fechaNacimiento,
      identificacion,
      cuentaBanco,
      fechaInicio,
      descuentaRenta,
      descuentaSeguroSocial,
    });
    handleConfirmaReg();
  };

  // Función para mostrar SweetAlert success de registro
  const handleConfirmaReg = () => {
    Swal.fire({
      title: 'Expediente añadido exitosamente',
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ok',
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí puedes agregar la lógica para eliminar la marca
        console.log('Marca eliminada');
      }
    });
  };  

  return (
    <div>
      <NavbarComponent />
      <div className="titulo">
        <h1>Ingreso de Expediente</h1>
      </div>
      <div className="contenedorPadre">
        <div className="contenedorHijo">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="nombres" className="form-label">Nombres:</label>
                <input type="text" className="form-control" id="nombres" value={nombres} onChange={(e) => setNombres(e.target.value)} />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="apellidos" className="form-label">Apellidos:</label>
                <input type="text" className="form-control" id="apellidos" value={apellidos} onChange={(e) => setApellidos(e.target.value)} />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="plaza" className="form-label">Plaza:</label>
              <select className="form-select" value={plaza} onChange={(e) => setPlaza(e.target.value)}>
                <option value="">Seleccionar...</option>
                <option value="Opción 1">Opción 1</option>
                <option value="Opción 2">Opción 2</option>
                <option value="Opción 3">Opción 3</option>
              </select>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="planilla" className="form-label">Planilla:</label>
                <select className="form-select" value={planilla} onChange={(e) => setPlanilla(e.target.value)}>
                  <option value="">Seleccionar...</option>
                  <option value="Opción 1">Opción 1</option>
                  <option value="Opción 2">Opción 2</option>
                  <option value="Opción 3">Opción 3</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="jornada" className="form-label">Jornada:</label>
                <select className="form-select" value={jornada} onChange={(e) => setJornada(e.target.value)}>
                  <option value="">Seleccionar...</option>
                  <option value="Opción 1">Opción 1</option>
                  <option value="Opción 2">Opción 2</option>
                  <option value="Opción 3">Opción 3</option>
                </select>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="formaPago" className="form-label">Forma de Pago:</label>
              <select className="form-select" value={formaPago} onChange={(e) => setFormaPago(e.target.value)}>
                <option value="">Seleccionar...</option>
                <option value="Opción 1">Opción 1</option>
                <option value="Opción 2">Opción 2</option>
                <option value="Opción 3">Opción 3</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="tipoContrato" className="form-label">Tipo de Contrato:</label>
              <select className="form-select" value={tipoContrato} onChange={(e) => setTipoContrato(e.target.value)}>
                <option value="">Seleccionar...</option>
                <option value="Opción 1">Opción 1</option>
                <option value="Opción 2">Opción 2</option>
                <option value="Opción 3">Opción 3</option>
              </select>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="sexo" className="form-label">Sexo:</label>
                <input type="text" className="form-control" id="sexo" value={sexo} onChange={(e) => setSexo(e.target.value)} />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="fechaNacimiento" className="form-label">Fecha de Nacimiento:</label>
                <input type="datetime-local" className="form-control" id="fechaNacimiento" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="identificacion" className="form-label">Identificación:</label>
                <input type="text" className="form-control" id="identificacion" value={identificacion} onChange={(e) => setIdentificacion(e.target.value)} />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="cuentaBanco" className="form-label">Cuenta Bancaria:</label>
                <input type="text" className="form-control" id="cuentaBanco" value={cuentaBanco} onChange={(e) => setCuentaBanco(e.target.value)} />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="fechaInicio" className="form-label">Fecha de Inicio:</label>
                <input type="datetime-local" className="form-control" id="fechaInicio" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
              </div>
            </div>
            <div className="form-check mb-3">
              <input type="checkbox" className="form-check-input" id="descuentaRenta" checked={descuentaRenta} onChange={(e) => setDescuentaRenta(e.target.checked)} />
              <label className="form-check-label" htmlFor="descuentaRenta">Descuenta ISR</label>
            </div>
            <div className="form-check mb-3">
              <input type="checkbox" className="form-check-input" id="descuentaSeguroSocial" checked={descuentaSeguroSocial} onChange={(e) => setDescuentaSeguroSocial(e.target.checked)} />
              <label className="form-check-label" htmlFor="descuentaSeguroSocial">Descuenta IGSS</label>
            </div>
            <div className="contenedorPadre">
                <button type="submit" className="btn btn-primary btn-lg" onClick={() => handleConfirmaReg()}>Guardar Expediente</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default IngresoExpediente;
