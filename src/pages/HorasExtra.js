import React from 'react'
import TableComponent from '../components/TableComponent'
import NavbarComponent from '../components/NavbarComponent'
import Swal from 'sweetalert2'

const HorasExtra = () => {
  const handleModificarMarca = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres modificar esta hora extra?',
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
      text: '¿Quieres eliminar esta hora extra?',
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
      <button type="button" className="btn btn-outline-success" onClick={handleModificarMarca}><i class="fa-solid fa-check"></i></button>
      <button type="button" className="btn btn-outline-primary"onClick={handleModificarMarca}><i class="fa-solid fa-pen"></i></button>
      <button type="button" className="btn btn-outline-danger"onClick={handleEliminarMarca}><i class="fa-solid fa-trash"></i></button>
    </div>
  );  

  const datostabla = [
    {
      id: 1,
      nombre: "Tarea 1",
      horaInicio: "09:00",
      horaFin: "10:00",
      horasExtra: 0,
    },
    {
      id: 2,
      nombre: "Reunión",
      horaInicio: "10:30",
      horaFin: "11:30",
      horasExtra: 0,
    },
    {
      id: 3,
      nombre: "Desarrollo",
      horaInicio: "12:00",
      horaFin: "14:00",
      horasExtra: 2,
    },
    {
      id: 4,
      nombre: "Llamada telefónica",
      horaInicio: "14:30",
      horaFin: "15:00",
      horasExtra: 0,
    },
    {
      id: 5,
      nombre: "Email",
      horaInicio: "15:30",
      horaFin: "16:00",
      horasExtra: 0,

    },
    {
      id: 6,
      nombre: "Tarea 2",
      horaInicio: "16:30",
      horaFin: "17:30",
      horasExtra: 1,
    },
    {
      id: 7,
      nombre: "Evento",
      horaInicio: "18:00",
      horaFin: "19:00",
      horasExtra: 1,
    },
    {
      id: 8,
      nombre: "Estudio",
      horaInicio: "19:30",
      horaFin: "21:00",
      horasExtra: 1.5,
    },
    {
      id: 9,
      nombre: "Cena",
      horaInicio: "21:30",
      horaFin: "22:30",
      horasExtra: 0,
    },
    {
      id: 10,
      nombre: "Relajarse",
      horaInicio: "22:30",
      horaFin: "23:30",
      horasExtra: 0,
    },
    {
      id: 11,
      nombre: "Tarea 3",
      horaInicio: "09:00",
      horaFin: "10:00",
      horasExtra: 0,
    },
    {
      id: 12,
      nombre: "Reunión",
      horaInicio: "10:30",
      horaFin: "11:30",
      horasExtra: 0,
    },
    {
      id: 13,
      nombre: "Desarrollo",
      horaInicio: "12:00",
      horaFin: "14:00",
      horasExtra: 2,
    },
    {
      id: 14,
      nombre: "Llamada telefónica",
      horaInicio: "14:30",
      horaFin: "15:00",
      horasExtra: 0,
    },
    {
      id: 15,
      nombre: "Email",
      horaInicio: "15:30",
      horaFin: "16:00",
      horasExtra: 0,
    },];

  const columnas = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Nombre',
      selector: row => row.nombre,
      sortable: true,
    },
    {
      name: 'Hora Inicio',
      selector: row => row.horaInicio,
      sortable: true,
    },
    {
      name: 'Hora Fin',
      selector: row => row.horaFin,
      sortable: true,
    },
    {
      name: 'Horas Extra',
      selector: row => row.horasExtra,
      sortable: true,
    },
    {
      name: 'Acciones',
      cell: accionesBotones, // Renderizar los botones de acciones
    },
  ];  

  return (
    <div>
      <NavbarComponent />
      <div className="titulo">
        <h1>Horas Extras</h1>
      </div>
      <TableComponent datostabla={datostabla} columnas={columnas} />
    </div>
  );
};

export default HorasExtra;
