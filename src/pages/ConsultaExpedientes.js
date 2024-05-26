import React, { useState, useEffect } from 'react';
import NavbarComponent from '../components/NavbarComponent';
import TableComponent from '../components/TableComponent';
import apiService from '../services/services';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";

const ConsultaExpedientes = () => {
  const [expedientes, setExpedientes] = useState([]);
  const [jornadas, setJornadas] = useState([]);
  const [formasPago, setFormasPago] = useState([]);
  const [tipoPlanilla, setTipoPlanilla] = useState([]);
  const [jornada, setJornada] = useState([]);
  const [formaPago, setFormaPago] = useState([]);
  const [tipoContrato, setTipoContrato] = useState([]);
  const [plaza, setPlaza] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataExpedientes = await apiService.getExpedientes();
        setExpedientes(dataExpedientes);

        const dataJornadas = await apiService.getJornadas();
        setJornadas(dataJornadas);

        const dataFormasPago = await apiService.getFormasPago();
        setFormasPago(dataFormasPago);


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

  const getJornadaDescripcion = (codJor) => {
    const jornada = jornadas.find(j => j.id === codJor);
    return jornada ? jornada.jor_descripcion : 'Desconocida';
  };

  const getFormaPagoDescripcion = (codFpa) => {
    const formaPago = formasPago.find(f => f.id === codFpa);
    return formaPago ? formaPago.fpa_descripcion : 'Desconocida';
  };

  const getTipoPlanillaDescripcionId = async (codTpl) => {
    const dataTipoPlanilla = await apiService.getTipoPlanillaId(codTpl);
    setTipoPlanilla(dataTipoPlanilla);
    return tipoPlanilla ? dataTipoPlanilla.tpl_nombre : 'Desconocido';
  };

  const getJornadaDescripcionId = async (codJor) => {
    const dataJornada = await apiService.getJornadaId(codJor);
    setJornada(dataJornada);
    return jornada ? dataJornada.jor_descripcion : 'Desconocido';
  };

  const getFormaPagoDescripcionId = async (codFpa) => {
    const dataFormaPago = await apiService.getFormaPagoId(codFpa);
    setFormaPago(dataFormaPago);
    return formaPago ? dataFormaPago.fpa_descripcion : 'Desconocido';
  };

  const getTipoContratoDescripcionId = async (codTpc) => {
    const dataTipoContrato = await apiService.getTipoContratoId(codTpc);
    setTipoContrato(dataTipoContrato);
    return tipoContrato ? dataTipoContrato.tpc_descripcion : 'Desconocido';
  }

  const getPlazaDescripcionId = async (codPlz) => {
    const dataPlaza = await apiService.getPlazaId(codPlz);
    setPlaza(dataPlaza);
    return plaza ? dataPlaza.plz_nombre : 'Desconocido';
  }

  const handleConsultaExpediente = async (id) => {
    try {
      const expediente = await apiService.getExpedienteId(id);
      const descTPL = await getTipoPlanillaDescripcionId(expediente.exp_codtpl)
      const descJOR = await getJornadaDescripcionId(expediente.exp_codjor)
      const descFPA = await getFormaPagoDescripcionId(expediente.exp_codfpa)
      const descTPC = await getTipoContratoDescripcionId(expediente.exp_codtpc)
      const descPLZ = await getPlazaDescripcionId(expediente.exp_codplz)
      Swal.fire({
        title: 'Información del Expediente',
        html: `
        <div style="text-align: left;">
        <p><strong>ID:</strong> ${expediente.id}</p>
        <p><strong>Nombres:</strong> ${expediente.exp_nombres}</p>
        <p><strong>Apellidos:</strong> ${expediente.exp_apellidos}</p>
        <p><strong>Tipo Planilla:</strong> ${descTPL}</p>
        <p><strong>Jornada:</strong> ${descJOR}</p>
        <p><strong>Forma de Pago:</strong> ${descFPA}</p>
        <p><strong>Tipo de Contrato:</strong> ${descTPC}</p>
        <p><strong>Plaza:</strong> ${descPLZ}</p>
        <p><strong>Sexo:</strong> ${expediente.exp_sexo}</p>
        <p><strong>Fecha de Nacimiento:</strong> ${expediente.exp_fecha_nacimiento}</p>
        <p><strong>Identificación:</strong> ${expediente.exp_identificacion}</p>
        <p><strong>Cuenta Banco:</strong> ${expediente.exp_cuenta_banco}</p>
        <p><strong>Fecha de Inicio:</strong> ${expediente.exp_fecha_ini}</p>
        <p><strong>Descuento Renta:</strong> ${expediente.exp_descuenta_renta}</p>
        <p><strong>Descuento Seguro Social:</strong> ${expediente.exp_decuenta_seguro_social}</p>
      </div>
      
        `,
        icon: 'info',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      });

    } catch (error) {
      console.error('Error al consultar el expediente Planilla:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo encontrar el expediente Planilla con el ID proporcionado',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      });
    }
  };

  const handleEliminarExpediente = (codigo) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar este expediente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await apiService.deleteExpediente(codigo);
        const dataExpedientes = await apiService.getExpedientes();
        setExpedientes(dataExpedientes);
      }
    });
  };


  const accionesBotones = (row) => (
    <div className="opcionesBTN">
      <button type="button" className="btn btn-outline-warning" onClick={() => handleConsultaExpediente(row.id)}><i className="fa-solid fa-info"></i></button>
      <Link to={`/ModificarExpediente/${row.id}`}><button type="button" className="btn btn-outline-primary custom-tooltip" data-toggle="tooltip" data-placement="top" title="Tooltip on top"><i className="fa-solid fa-pen"></i></button></Link>
      <button type="button" className="btn btn-outline-danger" onClick={() => handleEliminarExpediente(row.id)}><i className="fa-solid fa-trash"></i></button>
    </div>
  );

  const columnas = [
    {
      name: 'Código',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Nombre',
      selector: row => row.exp_nombres,
      sortable: true,
    },
    {
      name: 'Apellido',
      selector: row => row.exp_apellidos,
      sortable: true,
    },
    {
      name: 'Jornada',
      selector: row => getJornadaDescripcion(row.exp_codjor),
      sortable: true,
    },
    {
      name: 'Forma de Pago',
      selector: row => getFormaPagoDescripcion(row.exp_codfpa),
      sortable: true,
    },
    {
      name: 'Acciones',
      cell: accionesBotones,
      style: {
        width: '100px',
      },
    },
  ];

  return (
    <div>
      <NavbarComponent />
      <div className="titulo">
        <h1>Consulta de Expedientes</h1>
      </div>
      <div class="alineaDerecha ">
        <div className="alineaDerecha">
          <Link to={`/IngresoExpediente`}>
            <button type="button" className="btn btn-outline-success ">
              <i className="fa-solid fa-plus"></i> Crear Expediente
            </button></Link>
        </div>
      </div>
      <TableComponent datostabla={expedientes} columnas={columnas} />
    </div>
  );
};

export default ConsultaExpedientes;
