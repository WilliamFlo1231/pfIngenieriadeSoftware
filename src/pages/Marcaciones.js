import React, { useState, useEffect } from 'react';
import NavbarComponent from '../components/NavbarComponent'
import TableComponent from '../components/TableComponent'
import apiService from '../services/services';
import Swal from 'sweetalert2'

//ESTO UNICAMENTE LO VE EL ADMIN
const Marcaciones = () => {
  const [marcas, setMarcas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataMarcas = await apiService.getMarcas();
        setMarcas(dataMarcas);        


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

  // Función para mostrar SweetAlert de confirmación antes de modificar una marca
  const handleModificarMarca = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres modificar esta marca?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, modificar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí puedes agregar la lógica para modificar la marca
        console.log('Marca modificada');
      }
    });
  };

  // Función para mostrar SweetAlert de confirmación antes de eliminar una marca
  const handleEliminarMarca = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar esta marca?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async(result) => {
      if (result.isConfirmed) {
        // Aquí puedes agregar la lógica para eliminar la marca
        await apiService.deleteMarca(id);
        const dataMarcas = await apiService.getMarcas();
        setMarcas(dataMarcas);          
        console.log('Marca eliminada');
      }
    });
  };

  const accionesBotones = (row) => (
    <div className="opcionesBTN">
      <button type="button" className="btn btn-outline-primary custom-tooltip" data-toggle="tooltip" data-placement="top" title="Tooltip on top" onClick={handleModificarMarca}><i class="fa-solid fa-pen"></i></button>
      <button type="button" className="btn btn-outline-danger" onClick={() => handleEliminarMarca(row.id)}><i class="fa-solid fa-trash"></i></button>
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
      selector: row => row.mar_fecha,
      sortable: true,
    },
    {
      name: 'Hora',
      selector: row => row.mar_hora,
      sortable: true,
    },
    {
      name: 'Tipo de Marca',
      selector: row => row.mar_estado,
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
        <h1>Marcaciones</h1>
      </div>
      <TableComponent datostabla={marcas} columnas={columnas} />
    </div>
  )
};

export default Marcaciones;
