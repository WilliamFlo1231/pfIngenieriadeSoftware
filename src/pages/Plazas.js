import React, { useState, useEffect } from 'react';
import NavbarComponent from '../components/NavbarComponent';
import TableComponent from '../components/TableComponent';
import Swal from 'sweetalert2';
import apiService from '../services/services';

const Plazas = () => {
  const [plazas, setPlazas] = useState([]);
  const [centroDeCosto, setCentroDeCosto] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataPlazas = await apiService.getPlazas();
        setPlazas(dataPlazas);        

        const dataCentroDeCosto = await apiService.getCentroDeCosto();
        setCentroDeCosto(dataCentroDeCosto);
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

  //metodos para sweetalert
  const handleConsultaPlazas = async (id) => {
    try {
      const plazas = await apiService.getPlazasId(id);
      Swal.fire({
        title: 'Información de plazas',
        html: `
          <div style="text-align: left;">
            <p><strong>ID:</strong> ${plazas.id}</p>
            <p><strong>Código CCO :</strong> ${plazas.plz_codcco}</p>
            <p><strong>Nombre :</strong> ${plazas.plz_nombre}</p>
            <p><strong>Es temporal:</strong> ${plazas.plz_es_temporal}</p>
            <p><strong>Fecha Inicio :</strong> ${plazas.plz_fecha_ini}</p>
            <p><strong>Fecha Fin :</strong> ${plazas.plz_fecha_fin}</p>
          </div>
        `,
        icon: 'info',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      });

    } catch (error) {
      console.error('Error al consultar la plaza:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo encontrar la plaza con el ID proporcionado',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      });
    }
  };

  const handleModificarPlazas = async (id) => {
    try {
      await apiService.getCentroDeCosto();
      const plazas = await apiService.getPlazasId(id);
      Swal.fire({
        title: 'Modificar Plaza',
        html: `
          <div style="text-align: left;">
            <label for="plz_codcco">Código CCO:</label>
            <br/>
            <select id="plz_codcco" class="swal2-select">
            ${centroDeCosto.map(option => `<option value="${plazas.plz_codcco}">${option.cco_descripcion}</option>`).join('')}
          </select>
            <br/>
            <label for="plz_nombre">Nombre:</label>
            <br/>
            <input type="text" id="plz_nombre" class="swal2-input" placeholder="Ingrese el nombre" value="${plazas.plz_nombre}">
            <br/>
            <label for="plz_es_temporal">Plaza tempor al:</label>
            <br/>
            <select id="plz_es_temporal" class="swal2-select">
            <option value="true" ${plazas.plz_es_temporal === true ? 'selected' : ''}>Verdadero</option>
            <option value="false" ${plazas.plz_es_temporal === false ? 'selected' : ''}>Falso</option>
          </select>
            <br/>
            <label for="plz_fecha_ini">Fecha inicio:</label>
            <br/>
            <input type="date" id="plz_fecha_ini" class="swal2-input" placeholder="Ingrese la fecha de inicio" value="${plazas.plz_fecha_ini}">
            <br/>
            <label for="plz_fecha_fin">Fecha fin:</label>
            <br/>
            <input type="date" id="plz_fecha_fin" class="swal2-input" placeholder="Ingrese la fecha de finalizacion" value="${plazas.plz_fecha_fin}">
            <br/>
          </div>
        `,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Actualizar',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
          // Obtener los valores de los inputs
          const plz_codcco = Swal.getPopup().querySelector('#plz_codcco').value;
          const plz_nombre = Swal.getPopup().querySelector('#plz_nombre').value;
          const plz_es_temporal = Swal.getPopup().querySelector('#plz_es_temporal').value;
          const plz_fecha_ini = Swal.getPopup().querySelector('#plz_fecha_ini').value;
          const plz_fecha_fin = Swal.getPopup().querySelector('#plz_fecha_fin').value;

          // Llamar a la función para actualizar el periodo de planilla
          apiService.updatePlazas(plazas.id, {
            plz_codcco: plz_codcco,
            plz_nombre: plz_nombre,
            plz_es_temporal: plz_es_temporal,
            plz_fecha_ini: plz_fecha_ini,
            plz_fecha_fin: plz_fecha_fin,

          });
        }
      }).then(async(result) => {
        if (result.isConfirmed) {
          Swal.fire('Actualización confirmada', '', 'success');
          const dataPlazas = await apiService.getPlazas();
          setPlazas(dataPlazas);             
        }
      });
    } catch (error) {
      console.error('Error al consultar la plaza:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo encontrar la plaza con el ID proporcionado',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      });
    }
  };

  const handleEliminarPlazas = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar esta plaza?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async(result) => {
      if (result.isConfirmed) {
        // Aquí puedes agregar la lógica para eliminar la plazas
        await apiService.deletePlazas(id);
        console.log('plaza eliminada');
        const dataPlazas = await apiService.getPlazas();
        setPlazas(dataPlazas);   
      }
    });
  };

  const handlePostPlazas = async () => {
    // Espera a que se resuelva la promesa de los tres get
    await apiService.getCentroDeCosto();

    // Ahora tipoPlanilla tiene los datos actualizados
    Swal.fire({
      title: 'Crear Nueva Plaza',
      html: `
      <div style="text-align: left;">
      <label for="plz_codcco">Código CCO:</label>
      <br/>
      <select id="plz_codcco" class="swal2-select">
      ${centroDeCosto.map(option => `<option value="${plazas.plz_codcco}">${option.cco_descripcion}</option>`).join('')}
    </select>
      <br/>
      <label for="plz_nombre">Nombre:</label>
      <br/>
      <input type="text" id="plz_nombre" class="swal2-input" placeholder="Ingrese el nombre">
      <br/>
      <label for="plz_es_temporal">Plaza temporal:</label>
      <br/>
      <select id="plz_es_temporal" class="swal2-select">
      <option value="true" ${plazas.plz_es_temporal === true ? 'selected' : ''}>Verdadero</option>
      <option value="false" ${plazas.plz_es_temporal === false ? 'selected' : ''}>Falso</option>
    </select>
      <br/>
      <label for="plz_fecha_ini">Fecha inicio:</label>
      <br/>
      <input type="date" id="plz_fecha_ini" class="swal2-input" placeholder="Ingrese la fecha de inicio" value="${plazas.plz_fecha_ini}">
      <br/>
      <label for="plz_fecha_fin">Fecha fin:</label>
      <br/>
      <input type="date" id="plz_fecha_fin" class="swal2-input" placeholder="Ingrese la fecha de finalizacion" value="${plazas.plz_fecha_fin}">
      <br/>
    </div>
  `,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      preConfirm: async () => {
        // Obtener los valores de los inputs
        const plz_codcco = Swal.getPopup().querySelector('#plz_codcco').value;
        const plz_nombre = Swal.getPopup().querySelector('#plz_nombre').value;
        const plz_es_temporal = Swal.getPopup().querySelector('#plz_es_temporal').value;
        const plz_fecha_ini = Swal.getPopup().querySelector('#plz_fecha_ini').value;
        const plz_fecha_fin = Swal.getPopup().querySelector('#plz_fecha_fin').value;
        var isTrueSet = (plz_es_temporal === 'true');
        // Crear el nuevo ingreso
        try {
          await apiService.postPlazas({
            plz_codcco: plz_codcco,
            plz_nombre: plz_nombre,
            plz_es_temporal: isTrueSet,
            plz_fecha_ini: plz_fecha_ini,
            plz_fecha_fin: plz_fecha_fin,
          });
          Swal.fire('Creación exitosa', 'La nuevo plaza ha sido creado.', 'success');
          const dataPlazas = await apiService.getPlazas();
          setPlazas(dataPlazas);             
        } catch (error) {
          console.error('Error al crear la plaza:', error);
          Swal.fire('Error', 'No se pudo crear la plaza.', 'error');
        }
      }
    });
  };


  //fin metodos sweetalert 
  const accionesBotones = (row) => (
    <div className="opcionesBTN">
      <button type="button" className="btn btn-outline-warning" onClick={() => handleConsultaPlazas(row.id)}><i className="fa-solid fa-info"></i></button>
      <button type="button" className="btn btn-outline-primary custom-tooltip" data-toggle="tooltip" data-placement="top" title="Tooltip on top" onClick={() => handleModificarPlazas(row.id)}><i className="fa-solid fa-pen"></i></button>
      <button type="button" className="btn btn-outline-danger" onClick={() => handleEliminarPlazas(row.id)}><i className="fa-solid fa-trash"></i></button>
    </div>
  );

  const convertirBooleano = (valor) => valor ? 'VERDADERO' : 'FALSO';

  const columnas = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Nombre',
      selector: row => row.plz_nombre,
      sortable: true,
    },
    {
      name: 'Es temporal',
      selector: row => convertirBooleano(row.plz_es_temporal),
      sortable: true,
    },
    {
      name: 'Valor',
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
        <h1>Plazas</h1>
      </div>
      <div class="alineaDerecha ">
        <div className="alineaDerecha">
          <button type="button" className="btn btn-outline-success " onClick={() => handlePostPlazas()}>
            <i className="fa-solid fa-plus"></i> Crear Ingreso
          </button>
        </div>
      </div>
      <TableComponent datostabla={plazas} columnas={columnas} />
    </div>

  );
};

export default Plazas;
