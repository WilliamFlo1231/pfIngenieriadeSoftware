import React, { useState, useEffect } from 'react';
import NavbarComponent from '../components/NavbarComponent'
import TableComponent from '../components/TableComponent'
import apiService from '../services/services';
import Swal from 'sweetalert2'

//ESTO UNICAMENTE LO VE EL ADMIN
const Marcaciones = () => {
  const [marcas, setMarcas] = useState([]);
  const [expedientes, setExpedientes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataMarcas = await apiService.getMarcas();
        setMarcas(dataMarcas);

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

  const handleConsultaMarcaciones = async (id) => {
      try {
        const marcacion = await apiService.getMarcaId(id);
        const descEXP = getExpedienteNombres(marcacion.mar_codexp)
        Swal.fire({
          title: 'Información de la Marcación',
          html: `
            <div style="text-align: left;">
              <p><strong>ID:</strong> ${marcacion.id}</p>
              <p><strong>Nombre Expediente:</strong> ${descEXP}</p>
              <p><strong>Fecha marcacion:</strong> ${marcacion.mar_fecha}</p>
              <p><strong>Hora Marcacion:</strong> ${marcacion.mar_hora}</p>
              <p><strong>Estado:</strong> ${marcacion.mar_estado}</p>
            </div>
          `,
          icon: 'info',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok',
        });
  
      } catch (error) {
        console.error('Error al consultar el Descuento:', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo encontrar el Descuento con el ID proporcionado',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok',
        });
      }
    };

    const getExpedienteNombres = (codExp) => {
      const expediente = expedientes.find(e => e.id === codExp);
      return expediente ? expediente.exp_nombres : 'Desconocido';
    };


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
    }).then(async (result) => {
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
      <button type="button" className="btn btn-outline-warning" onClick={() => handleConsultaMarcaciones(row.id)}><i className="fa-solid fa-info"></i></button>
      
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
      name: 'Expediente',
      selector: row => getExpedienteNombres(row.mar_codexp),
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
