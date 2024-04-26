import React from 'react'
import NavbarComponent from '../components/NavbarComponent'
import TableComponent from '../components/TableComponent'
import Swal from 'sweetalert2'

const Marcaciones = () => {
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
  const handleEliminarMarca = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar esta marca?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí puedes agregar la lógica para eliminar la marca
        console.log('Marca eliminada');
      }
    });
  };

  const accionesBotones = (row) => (
    <div className="opcionesBTN">
      <button type="button" className="btn btn-outline-primary" onClick={handleModificarMarca}><i class="fa-solid fa-pen"></i></button>
      <button type="button" className="btn btn-outline-danger" onClick={handleEliminarMarca}><i class="fa-solid fa-trash"></i></button>
    </div>
  );

  const datostabla = [
    {
      id: 1,
      fecha: "2024-04-23",
      hora: "09:00",
      tipoMarca: "Entrada",
    },
    {
      id: 2,
      fecha: "2024-04-23",
      hora: "13:00",
      tipoMarca: "Salida",
    },
    // Otros datos...
  ];

  const columnas = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Fecha',
      selector: row => row.fecha,
      sortable: true,
    },
    {
      name: 'Hora',
      selector: row => row.hora,
      sortable: true,
    },
    {
      name: 'Tipo de Marca',
      selector: row => row.tipoMarca,
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
      <TableComponent datostabla={datostabla} columnas={columnas} />
    </div>
  )
};

export default Marcaciones;
