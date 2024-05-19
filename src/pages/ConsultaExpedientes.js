import React, { useState, useEffect } from 'react';
import NavbarComponent from '../components/NavbarComponent';
import TableComponent from '../components/TableComponent';
import axios from 'axios';
import Swal from 'sweetalert2';

const ConsultaExpedientes = () => {
  const url = "http://localhost:3000/expediente"; // Cambia la URL según corresponda
  const [expedientes, setExpedientes] = useState([]);

  useEffect(() => {
    getExpedientes();
  }, []);

  const getExpedientes = async () => {
    try {
      const response = await axios.get(url);
      setExpedientes(response.data);
    } catch (error) {
      console.error('Error al obtener los expedientes:', error);
    }
  };

  const deleteExpediente = async (codigo) => {
    try {
      await axios.delete(`${url}/${codigo}`);
      getExpedientes();
      console.log(`Expediente con código ${codigo} eliminado`);
    } catch (error) {
      console.error('Error al eliminar el expediente:', error);
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
    }).then((result) => {
      if (result.isConfirmed) {
        deleteExpediente(codigo);
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
      selector: row => row.codigo,
      sortable: true,
    },
    {
      name: 'Nombre',
      selector: row => row.nombre,
      sortable: true,
    },
    {
      name: 'Apellido',
      selector: row => row.apellido,
      sortable: true,
    },
    {
      name: 'Planilla',
      selector: row => row.planilla,
      sortable: true,
    },
    {
      name: 'Jornada',
      selector: row => row.jornada,
      sortable: true,
    },
    {
      name: 'Forma de Pago',
      selector: row => row.forma_pago,
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
