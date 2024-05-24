import React, { useState, useEffect } from 'react';
import NavbarComponent from '../components/NavbarComponent';
import TableComponent from '../components/TableComponent';
import apiService from '../services/services';
import Swal from 'sweetalert2';

const ConsultaExpedientes = () => {
  const [expedientes, setExpedientes] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataExpedientes = await apiService.getExpedientes();
        setExpedientes(dataExpedientes);        

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
    }).then(async(result) => {
      if (result.isConfirmed) {
        await apiService.deleteExpediente(codigo);
        const dataExpedientes = await apiService.getExpedientes();
        setExpedientes(dataExpedientes);              
      }
    });
  };

  const accionesBotones = (row) => (
    <div className="opcionesBTN">
      <button type="button" className="btn btn-outline-danger" onClick={() => handleEliminarExpediente(row.codigo)}><i className="fa-solid fa-trash"></i></button>
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
      name: 'Planilla',
      selector: row => row.exp_planilla,
      sortable: true,
    },
    {
      name: 'Jornada',
      selector: row => row.exp_codjor,
      sortable: true,
    },
    {
      name: 'Forma de Pago',
      selector: row => row.exp_codfpa,
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
      <TableComponent datostabla={expedientes} columnas={columnas} />
    </div>
  );
};

export default ConsultaExpedientes;
