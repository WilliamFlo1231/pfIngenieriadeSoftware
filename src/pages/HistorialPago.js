import React, { useState, useEffect } from 'react';
import NavbarEmpleadoComponent from '../components/NavbarEmpleadoComponent'
import TableComponent from '../components/TableComponent';
import apiService from '../services/services';
import Swal from 'sweetalert2';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfHPAComponent from '../components/PdfHPAComponent';
import Cookies from 'js-cookie';

function HistorialPago() {
  const user = Cookies.get('user');
  var userData = {};
  if (user) {
    userData = JSON.parse(user);
  }
  const [historialPago, setHistorialPago] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataHistorialPago = await apiService.getHistorialPago();
        setHistorialPago(dataHistorialPago);
      } catch (error) {
        console.error('Error al obtener datos:', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo obtener la información necesaria.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    };
    fetchData();
  }, []);

  const historialPagoFiltrado = historialPago.filter(hpa => hpa.hpa_codexp === parseInt(userData.expid));

  const accionesBotones = (row) => (
    <div className="opcionesBTN">
      <PDFDownloadLink document={
        <PdfHPAComponent/>
      } fileName="HistorialPago.pdf">
          <button type="button" className="btn btn-outline-primary" ><i class="fa-solid fa-download"></i></button>
      </PDFDownloadLink>
    </div>
  );

  const columnas = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Fecha',
      selector: row => row.hpa_fecha_pago,
      sortable: true,
    },
    {
      name: 'Monto',
      selector: row => row.hpa_salario,
      sortable: true,
    },
    {
      name: 'Descripcion',
      selector: row => row.hpa_descrpcion,
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
      <NavbarEmpleadoComponent />
      <div className="titulo">
        <h1>Historial de Pago</h1>
      </div>
      <TableComponent datostabla={historialPagoFiltrado} columnas={columnas} />
    </div >

  );
}

export default HistorialPago
