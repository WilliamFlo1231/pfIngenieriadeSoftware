import React, { useState, useEffect } from 'react';
import NavbarComponent from '../components/NavbarComponent';
import Swal from 'sweetalert2'
import apiService from '../services/services';


function IngresoExpediente() {
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [tipoPlanilla, setTipoPlanilla] = useState('');
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

  const [expedientes, setExpedientes] = useState([]);
  const [jornadas, setJornadas] = useState([]);
  const [formasPago, setFormasPago] = useState([]);
  const [plazas, setPlazas] = useState([]);
  const [tiposPlanilla, setTiposPlanilla] = useState([]);
  const [tipoContratos, setTipoContratos] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataExpedientes = await apiService.getExpedientes();
        setExpedientes(dataExpedientes);

        const dataJornadas = await apiService.getJornadas();
        setJornadas(dataJornadas);

        const dataFormasPago = await apiService.getFormasPago();
        setFormasPago(dataFormasPago);

        const dataPlazas = await apiService.getPlazas();
        setPlazas(dataPlazas);

        const dataTiposPlanilla = await apiService.getTiposPlanilla();
        setTiposPlanilla(dataTiposPlanilla);

        const dataTipoContratos = await apiService.getTiposContrato();
        setTipoContratos(dataTipoContratos);


      } catch (error) {
        console.error('Error al obtener datos:', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo obtener la información necesaria.',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      nombres.trim() === '' ||
      apellidos.trim() === '' ||
      tipoPlanilla.trim() === '' ||
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

    var stringDescuentaRenta = ""
    if (descuentaRenta == true) {
      stringDescuentaRenta = "1";
    } else {
      stringDescuentaRenta = "0";
    }

    var stringDescuentaSeguroSocial = ""
    if (descuentaSeguroSocial == true) {
      stringDescuentaSeguroSocial = "1";
    } else {
      stringDescuentaSeguroSocial = "0";
    }


    const nuevoExpediente = {
      exp_nombres: nombres,
      exp_apellidos: apellidos,
      exp_codtpl: parseInt(tipoPlanilla),
      exp_codjor: parseInt(jornada),
      exp_codfpa: parseInt(formaPago),
      exp_codtpc: parseInt(tipoContrato),
      exp_codplz: parseInt(plaza),
      exp_sexo: sexo,
      exp_fecha_nacimiento: fechaNacimiento,
      exp_identificacion: identificacion,
      exp_cuenta_banco: cuentaBanco,
      exp_fecha_ini: fechaInicio,
      exp_descuenta_renta: stringDescuentaRenta,
      exp_decuenta_seguro_social: stringDescuentaSeguroSocial,
    };

    try {
      await apiService.postExpediente(nuevoExpediente);
      Swal.fire({
        title: 'Expediente añadido exitosamente',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      });
      // Resetea el formulario si es necesario
      setNombres('');
      setApellidos('');
      setTipoPlanilla('');
      setJornada('');
      setFormaPago('');
      setPlaza('');
      setTipoContrato('');
      setSexo('');
      setFechaNacimiento('');
      setIdentificacion('');
      setCuentaBanco('');
      setFechaInicio('');
      setDescuentaRenta(false);
      setDescuentaSeguroSocial(false);
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'No se pudo crear el expediente.',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      });
    }
  };

  const validarFechaNacimiento = (fecha) => {
    const hoy = new Date();
    console.log(fecha)
    
    const fechaNacimiento = new Date(fecha);
    const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    console.log(edad)
    /*const mes = hoy.getMonth() - fechaNacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
      edad--;
    }*/
    if (edad < 18 || edad > 100) {
      Swal.fire({
        title: 'Fecha de nacimiento inválida',
        text: 'La edad debe ser mayor a 18 años y menor a 100 años.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      return false;
    }
    return true;
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
        console.log('error');
      }
    });
  };

  return (
    <div>
      <NavbarComponent />
      <div className="titulo">
        <h1>Ingreso de Expediente</h1>
      </div>
      <div className="contenedorPadre mb-5">
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
                {plazas.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.plz_nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="tiposPlanilla" className="form-label">Tipo Planilla:</label>
                <select className="form-select" value={tipoPlanilla} onChange={(e) => setTipoPlanilla(e.target.value)}>
                  <option value="">Seleccionar...</option>
                  {tiposPlanilla.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.tpl_nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="jornada" className="form-label">Jornada:</label>
                <select className="form-select" value={jornada} onChange={(e) => setJornada(e.target.value)}>
                  <option value="">Seleccionar...</option>
                  {jornadas.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.jor_descripcion}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="formaPago" className="form-label">Forma de Pago:</label>
              <select className="form-select" value={formaPago} onChange={(e) => setFormaPago(e.target.value)}>
                <option value="">Seleccionar...</option>
                {formasPago.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.fpa_descripcion}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="tipoContrato" className="form-label">Tipo de Contrato:</label>
              <select className="form-select" value={tipoContrato} onChange={(e) => setTipoContrato(e.target.value)}>
                <option value="">Seleccionar...</option>
                {tipoContratos.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.tpc_descripcion}
                  </option>
                ))}
              </select>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="sexo" className="form-label">Sexo:</label>
                <select className="form-select" value={sexo} onChange={(e) => setSexo(e.target.value)}>
                  <option value="">Seleccionar...</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femeninio</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="fechaNacimiento" className="form-label">Fecha de Nacimiento:</label>
                <input type="date" className="form-control" id="fechaNacimiento" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="identificacion" className="form-label">Identificación:</label>
                <input type="number" className="form-control" id="identificacion" value={identificacion} onChange={(e) => setIdentificacion(e.target.value)} />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="cuentaBanco" className="form-label">Cuenta Bancaria:</label>
                <input type="number" className="form-control" id="cuentaBanco" value={cuentaBanco} onChange={(e) => setCuentaBanco(e.target.value)} />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="fechaInicio" className="form-label">Fecha de Inicio:</label>
                <input type="date" className="form-control" id="fechaInicio" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
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
