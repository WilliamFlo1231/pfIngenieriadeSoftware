import React, { useState, useEffect } from 'react';
import NavbarComponent from '../components/NavbarComponent';
import TableComponent from '../components/TableComponent';
import apiService from '../services/services';
import Swal from 'sweetalert2';

const PeriodoPlanilla = () => {
  const [periodoPlanilla, setPeriodoPlanilla] = useState([]);
  const [tipoPlanilla, setTipoPlanilla] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataPeriodoPlanilla = await apiService.getPeriodoPlanilla();
        setPeriodoPlanilla(dataPeriodoPlanilla);

        const dataTipoPlanilla = await apiService.getTiposPlanilla();
        setTipoPlanilla(dataTipoPlanilla);
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
  const handleConsultaPeriodoPlanilla = async (id) => {
    try {
      const periodoPlanilla = await apiService.getPeriodoPlanillaId(id);
      Swal.fire({
        title: 'Información del Período Planilla',
        html: `
          <div style="text-align: left;">
            <p><strong>ID:</strong> ${periodoPlanilla.id}</p>
            <p><strong>Código TPL:</strong> ${periodoPlanilla.ppl_codigo_tpl}</p>
            <p><strong>Código Visual:</strong> ${periodoPlanilla.ppl_codigo_visual}</p>
            <p><strong>Estado:</strong> ${periodoPlanilla.ppl_estado}</p>
            <p><strong>Fecha de Inicio:</strong> ${periodoPlanilla.ppl_fecha_ini}</p>
            <p><strong>Fecha de Fin:</strong> ${periodoPlanilla.ppl_fecha_fin}</p>
            <p><strong>Año:</strong> ${periodoPlanilla.ppl_anio}</p>
            <p><strong>Mes:</strong> ${periodoPlanilla.ppl_mes}</p>
          </div>
        `,
        icon: 'info',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      });

    } catch (error) {
      console.error('Error al consultar el Período Planilla:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo encontrar el Período Planilla con el ID proporcionado',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      });
    }
  };

  const handleModificarPeriodoPlanilla = async (id) => {
    try {
      await apiService.getTiposPlanilla();
      const periodoPlanilla = await apiService.getPeriodoPlanillaId(id);
      Swal.fire({
        title: 'Modificar Periodo Planilla',
        html: `
          <div style="text-align: left;">
            <label for="codigo_tpl">Código TPL:</label>
            <br/>
            <select id="codigo_tpl" class="swal2-select">
            ${tipoPlanilla.map(option => `<option value="${periodoPlanilla.ppl_codigo_tpl}">${option.tpl_nombre}</option>`).join('')}
          </select>
            <br/>
            <label for="codigo_visual">Código Visual:</label>
            <br/>
            <input type="text" id="codigo_visual" class="swal2-input" placeholder="Ingrese el código visual" value="${periodoPlanilla.ppl_codigo_visual}">
            <br/>
            <label for="estado">Estado:</label>
            <br/>
            <input type="text" id="estado" class="swal2-input" placeholder="Ingrese el estado" value="${periodoPlanilla.ppl_estado}">
            <br/>
            <label for="fecha_ini">Fecha de Inicio:</label>
            <br/>
            <input type="date" id="fecha_ini" class="swal2-input" value="${periodoPlanilla.ppl_fecha_ini}">
            <br/>
            <label for="fecha_fin">Fecha de Fin:</label>
            <br/>
            <input type="date" id="fecha_fin" class="swal2-input" value="${periodoPlanilla.ppl_fecha_fin}">
            <br/>
            <label for="anio">Año:</label>
            <br/>
            <input type="number" id="anio" class="swal2-input" placeholder="Ingrese el año" value="${periodoPlanilla.ppl_anio}">
            <br/>
            <label for="mes">Mes:</label>
            <br/>
            <input type="number" id="mes" class="swal2-input" placeholder="Ingrese el mes" value="${periodoPlanilla.ppl_mes}">
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
          const codigo_tpl = Swal.getPopup().querySelector('#codigo_tpl').value;
          const codigo_visual = Swal.getPopup().querySelector('#codigo_visual').value;
          const estado = Swal.getPopup().querySelector('#estado').value;
          const fecha_ini = Swal.getPopup().querySelector('#fecha_ini').value;
          const fecha_fin = Swal.getPopup().querySelector('#fecha_fin').value;
          const anio = Swal.getPopup().querySelector('#anio').value;
          const mes = Swal.getPopup().querySelector('#mes').value;

          // Llamar a la función para actualizar el periodo de planilla
          apiService.updatePeriodoPlanilla(periodoPlanilla.id, {
            ppl_codigo_tpl: codigo_tpl,
            ppl_codigo_visual: codigo_visual,
            ppl_estado: estado,
            ppl_fecha_ini: fecha_ini,
            ppl_fecha_fin: fecha_fin,
            ppl_anio: anio,
            ppl_mes: mes
          });
          
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire('Actualización confirmada', '', 'success');
          const dataPeriodoPlanilla = await apiService.getPeriodoPlanilla();
          setPeriodoPlanilla(dataPeriodoPlanilla);
        }
      });
    } catch (error) {
      console.error('Error al consultar el Período Planilla:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo encontrar el Período Planilla con el ID proporcionado',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      });
    }
  };

  const handleEliminarPeriodoPlanilla = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar esta PeriodoPlanilla?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async(result) => {
      if (result.isConfirmed) {
        // Aquí puedes agregar la lógica para eliminar la PeriodoPlanilla
        await apiService.deletePeriodoPlanilla(id);
        const dataPeriodoPlanilla = await apiService.getPeriodoPlanilla();
        setPeriodoPlanilla(dataPeriodoPlanilla);
        console.log('PeriodoPlanilla eliminada');
      }
    });
  };

  const handlePostPeriodoPlanilla = async () => {
    // Espera a que se resuelva la promesa de getTipoPlanilla
    await apiService.getTiposPlanilla();

    // Ahora tipoPlanilla tiene los datos actualizados
    Swal.fire({
      title: 'Crear Periodo Planilla',
      html: `
        <div style="text-align: left;">
          <label for="codigo_tpl">Código TPL:</label>
          <br/>
          <select id="codigo_tpl" class="swal2-select">
            ${tipoPlanilla.map(option => `<option value="${option.id}">${option.tpl_nombre}</option>`).join('')}
          </select>
          <br/>
          <label for="codigo_visual">Código Visual:</label>
          <br/>
          <input type="text" id="codigo_visual" class="swal2-input" placeholder="Ingrese el código visual">
          <br/>
          <label for="estado">Estado:</label>
          <br/>
          <input type="text" id="estado" class="swal2-input" placeholder="Ingrese el estado">
          <br/>
          <label for="fecha_ini">Fecha de Inicio:</label>
          <br/>
          <input type="date" id="fecha_ini" class="swal2-input">
          <br/>
          <label for="fecha_fin">Fecha de Fin:</label>
          <br/>
          <input type="date" id="fecha_fin" class="swal2-input">
          <br/>
          <label for="anio">Año:</label>
          <br/>
          <input type="number" id="anio" class="swal2-input" placeholder="Ingrese el año">
          <br/>
          <label for="mes">Mes:</label>
          <br/>
          <input type="number" id="mes" class="swal2-input" placeholder="Ingrese el mes">
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
        const codigo_tpl = Swal.getPopup().querySelector('#codigo_tpl').value;
        const codigo_visual = Swal.getPopup().querySelector('#codigo_visual').value;
        const estado = Swal.getPopup().querySelector('#estado').value;
        const fecha_ini = Swal.getPopup().querySelector('#fecha_ini').value;
        const fecha_fin = Swal.getPopup().querySelector('#fecha_fin').value;
        const anio = Swal.getPopup().querySelector('#anio').value;
        const mes = Swal.getPopup().querySelector('#mes').value;

        // Crear el nuevo periodo de planilla
        try {
          await apiService.postPeriodoPlanilla({
            ppl_codigo_tpl: codigo_tpl,
            ppl_codigo_visual: codigo_visual,
            ppl_estado: estado,
            ppl_fecha_ini: fecha_ini,
            ppl_fecha_fin: fecha_fin,
            ppl_anio: anio,
            ppl_mes: mes
          });
          Swal.fire('Creación exitosa', 'El nuevo periodo de planilla ha sido creado.', 'success');
          const dataPeriodoPlanilla = await apiService.getPeriodoPlanilla();
          setPeriodoPlanilla(dataPeriodoPlanilla);
        } catch (error) {
          console.error('Error al crear el periodo de planilla:', error);
          Swal.fire('Error', 'No se pudo crear el nuevo periodo de planilla.', 'error');
        }
      }
    });
  };


  //fin metodos sweetalert 
  const accionesBotones = (row) => (
    <div className="opcionesBTN">
      <button type="button" className="btn btn-outline-warning" onClick={() => handleConsultaPeriodoPlanilla(row.id)}><i className="fa-solid fa-info"></i></button>
      <button type="button" className="btn btn-outline-primary custom-tooltip" data-toggle="tooltip" data-placement="top" title="Tooltip on top" onClick={() => handleModificarPeriodoPlanilla(row.id)}><i className="fa-solid fa-pen"></i></button>
      <button type="button" className="btn btn-outline-danger" onClick={() => handleEliminarPeriodoPlanilla(row.id)}><i className="fa-solid fa-trash"></i></button>
    </div>
  );

  const columnas = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Código Visual',
      selector: row => row.ppl_codigo_visual,
      sortable: true,
    },
    {
      name: 'Estado',
      selector: row => row.ppl_estado,
      sortable: true,
    },
    {
      name: 'Año',
      selector: row => row.ppl_anio,
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
        <h1>Periodos de Planilla</h1>
      </div>
      <div class="alineaDerecha ">
        <div className="alineaDerecha">
          <button type="button" className="btn btn-outline-success " onClick={() => handlePostPeriodoPlanilla()}>
            <i className="fa-solid fa-plus"></i> Crear Periodo Planilla
          </button>
        </div>
      </div>
      <TableComponent datostabla={periodoPlanilla} columnas={columnas} />
    </div>

  );
};

export default PeriodoPlanilla;
