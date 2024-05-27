import React, { useState, useEffect } from 'react';
import NavbarComponent from '../components/NavbarComponent'
import apiService from '../services/services';
import Swal from 'sweetalert2';
import TableComponent from '../components/TableComponent';


function ConsultaSolicitudVacaciones() {
  const [expediente, setExpediente] = useState([]);
  const [solicitudVacaciones, setSolicitudVacaciones] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const dataExpedientes = await apiService.getExpedientes();
        setExpediente(dataExpedientes);

        const dataSolicitudVacaciones = await apiService.getSolicitudVacaciones();
        setSolicitudVacaciones(dataSolicitudVacaciones);
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

  const getExpedienteNombres = (codExp) => {
    const expedientes = expediente.find(e => e.id === codExp);
    return expedientes ? expedientes.exp_nombres : 'Desconocido';
  };

  const handleConsultaSolicitud = async (id) => {
    try {
      const solicitud = await apiService.getSolicitudVacacionesId(id);
      const descEXP = getExpedienteNombres(solicitud.sdv_codexp)
      Swal.fire({
        title: 'Información de la Solicitud',
        html: `
          <div style="text-align: left;">
            <p><strong>ID:</strong> ${solicitud.id}</p>
            <p><strong>Nombre Expediente:</strong> ${descEXP}</p>
            <p><strong>Fecha Solicitud:</strong> ${solicitud.sdv_fecha_solicitud}</p>
            <p><strong>Desde:</strong> ${solicitud.sdv_desde}</p>
            <p><strong>Hasta:</strong> ${solicitud.sdv_hasta}</p>
            <p><strong>Dias:</strong> ${solicitud.sdv_dias}</p>
            <p><strong>Estado:</strong> ${solicitud.sdv_estado}</p>
          </div>
        `,
        icon: 'info',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      });

    } catch (error) {
      console.error('Error al consultar la Solicitud:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo encontrar la Solicitud con el ID proporcionado',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      });
    }

  };

  const handleAutoriza = async (id) => {
    try {
      const solicitud = await apiService.getSolicitudVacacionesId(id);
      await apiService.updateSolicitudVacaciones(id, { 
        sdv_codexp: solicitud.sdv_codexp,
        sdv_fecha_solicitud: solicitud.sdv_fecha_solicitud,
        sdv_desde: solicitud.sdv_desde,
        sdv_hasta: solicitud.sdv_hasta,
        sdv_dias: solicitud.sdv_dias,
        sdv_estado: "Autorizado"
      });
      const dataSolicitudVacaciones = await apiService.getSolicitudVacaciones();
      setSolicitudVacaciones(dataSolicitudVacaciones);
      Swal.fire({
        title: 'Solicitud de vacaciones autorizada exitosamente',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      });
    } catch (error) {
      console.error('Error al autorizar la solicitud de vacaciones:', error);
      // Aquí puedes agregar lógica para manejar el error, como mostrar un mensaje de error
    }

  };

  const handleRechaza = async (id) => {
    try {
      await apiService.updateSolicitudVacaciones(id, { sdv_estado: "Rechazado" });
      const dataSolicitudVacaciones = await apiService.getSolicitudVacaciones();
      setSolicitudVacaciones(dataSolicitudVacaciones);
      Swal.fire({
        title: 'Solicitud de vacaciones rechazada exitosamente',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      });
    } catch (error) {
      console.error('Error al rechazar la solicitud de vacaciones:', error);
      // Aquí puedes agregar lógica para manejar el error, como mostrar un mensaje de error
    }

  };



    //fin metodos sweetalert 
    const accionesBotones = (row) => (
      <div className="opcionesBTN">
        <button type="button" className="btn btn-outline-warning" onClick={() => handleConsultaSolicitud(row.id)}><i className="fa-solid fa-info"></i></button>
        <button type="button" className="btn btn-outline-success custom-tooltip" data-toggle="tooltip" data-placement="top" title="Autoriza" onClick={() => handleAutoriza(row.id)}><i class="fa-solid fa-check"></i></button>
        <button type="button" className="btn btn-outline-danger custom-tooltip" data-toggle="tooltip" data-placement="top" title="Rechaza"  onClick={() => handleRechaza(row.id)}><i class="fa-solid fa-x"></i></button>
      </div>
    );

  const columnas = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Expediente',
      selector: row => getExpedienteNombres(row.sdv_codexp),
      sortable: true,
    },
    {
      name: 'Fecha Solicitud',
      selector: row => row.sdv_fecha_solicitud,
      sortable: true,
    },
    {
      name: 'Dias',
      selector: row => row.sdv_dias,
      sortable: true,
    },
    {
      name: 'Estado',
      selector: row => row.sdv_estado,
      sortable: true,
    },
    {
      name: 'Acciones',
      cell: accionesBotones,
      style: {
        width: '200px', // Ajusta el tamaño de la columna "Acciones" según sea necesario
      },
    },
  ];
  return (
    <div>
      <NavbarComponent /> 
      <div className="titulo">
        <h1>Solicitudes de vacaciones</h1>
      </div>
      <TableComponent datostabla={solicitudVacaciones} columnas={columnas} />      
    </div>
  )
}

export default ConsultaSolicitudVacaciones
