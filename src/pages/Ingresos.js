import React, { useState, useEffect } from 'react';
import NavbarComponent from '../components/NavbarComponent';
import TableComponent from '../components/TableComponent';
import Swal from 'sweetalert2';
import apiService from '../services/services';

const Ingresos = () => {
  const [ingresos, setingresos] = useState([]);
  const [periodoPlanilla, setPeriodoPlanilla] = useState([]);
  const [expendiente, setExpediente] = useState([]);
  const [tipoIngreso, setTipoIngreso] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataIngresos = await apiService.getIngresos();
        setingresos(dataIngresos);

        const dataPeriodoPlanilla = await apiService.getPeriodoPlanilla();
        setPeriodoPlanilla(dataPeriodoPlanilla);

        const dataExpendiente = await apiService.getExpendiente();
        setExpediente(dataExpendiente);

        const dataTipoIngreso = await apiService.getTipoIngreso();
        setTipoIngreso(dataTipoIngreso);

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
  const handleConsultaIngresos = async (id) => {
    try {
      const ingresos = await apiService.getIngresosId(id);
      Swal.fire({
        title: 'Información del ingreso',
        html: `
          <div style="text-align: left;">
            <p><strong>ID:</strong> ${ingresos.id}</p>
            <p><strong>Código PPL :</strong> ${ingresos.inn_codppl}</p>
            <p><strong>Código Expediente:</strong> ${ingresos.inn_codexp}</p>
            <p><strong>Código Tipo de Ingreso:</strong> ${ingresos.inn_codtig}</p>
            <p><strong>Valor:</strong> ${ingresos.inn_valor}</p>

          </div>
        `,
        icon: 'info',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      });

    } catch (error) {
      console.error('Error al consultar el ingreso:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo encontrar el ingreso con el ID proporcionado',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      });
    }
  };

  const handleModificarIngresos = async (id) => {
    try {
      await apiService.getExpendiente();
      await apiService.getTipoIngreso();
      await apiService.getPeriodoPlanilla();
      const ingresos = await apiService.getIngresosId(id);
      Swal.fire({
        title: 'Modificar Ingreso',
        html: `
          <div style="text-align: left;">
            <label for="codigo_ppl">Código PPL:</label>
            <br/>
            <select id="codigo_ppl" class="swal2-select">
            ${periodoPlanilla.map(option => `<option value="${ingresos.inn_codppl}">${option.id}</option>`).join('')}
          </select>
            <br/>
            <label for="codigo_exp">Código EXP:</label>
            <br/>
            <select id="codigo_exp" class="swal2-select">
            ${expendiente.map(option => `<option value="${ingresos.inn_codexp}">${option.exp_nombres}</option>`).join('')}
          </select>
            <br/>
            <label for="codigo_tig">Código TIG:</label>
            <br/>
            <select id="codigo_tig" class="swal2-select">
            ${tipoIngreso.map(option => `<option value="${ingresos.inn_codtig}">${option.tig_descripcion}</option>`).join('')}
          </select>
            <br/>
            <label for="valor">Valor:</label>
            <br/>
            <input type="number" id="valor" class="swal2-input" placeholder="Ingrese el valor" value="${ingresos.inn_valor}">
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
          const codigo_ppl = Swal.getPopup().querySelector('#codigo_ppl').value;
          const codigo_exp = Swal.getPopup().querySelector('#codigo_exp').value;
          const codigo_tig = Swal.getPopup().querySelector('#codigo_tig').value;
          const valor = Swal.getPopup().querySelector('#valor').value;


          // Llamar a la función para actualizar el periodo de planilla
          apiService.updateIngresos(ingresos.id, {
            inn_codppl: codigo_ppl,
            inn_codexp: codigo_exp,
            inn_codtig: codigo_tig,
            inn_valor: valor,

          });
        }
      }).then(async(result) => {
        if (result.isConfirmed) {
          Swal.fire('Actualización confirmada', '', 'success');
          const dataIngresos = await apiService.getIngresos();
          setingresos(dataIngresos);          
        }
      });
    } catch (error) {
      console.error('Error al consultar el Ingreso:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo encontrar el ingreso con el ID proporcionado',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      });
    }
  };

  const handleEliminarIngresos = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar este ingreso?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async(result) => {
      if (result.isConfirmed) {
        await apiService.deleteIngresos(id);
        console.log('ingreso eliminada');
        const dataIngresos = await apiService.getIngresos();
        setingresos(dataIngresos);        
      }
    });
  };

  const handlePostIngresos = async () => {
    // Espera a que se resuelva la promesa de los tres get
    await apiService.getExpendiente();
    await apiService.getTipoIngreso();
    await apiService.getPeriodoPlanilla();

    // Ahora tipoPlanilla tiene los datos actualizados
    Swal.fire({
      title: 'Crear Nuevo Ingreso',
      html: `
      <div style="text-align: left;">
      <label for="codigo_ppl">Código PPL:</label>
      <br/>
      <select id="codigo_ppl" class="swal2-select">
      ${periodoPlanilla.map(option => `<option value="${option.id}">${option.id}</option>`).join('')}
    </select>
      <br/>
      <label for="codigo_exp">Código EXP:</label>
      <br/>
      <select id="codigo_exp" class="swal2-select">
      ${expendiente.map(option => `<option value="${option.id}">${option.exp_nombres}</option>`).join('')}
    </select>
      <br/>
      <label for="codigo_tig">Código TIG:</label>
      <br/>
      <select id="codigo_tig" class="swal2-select">
      ${tipoIngreso.map(option => `<option value="${option.id}">${option.tig_descripcion}</option>`).join('')}
    </select>
      <br/>
      <label for="valor">Valor:</label>
      <br/>
      <input type="number" id="valor" class="swal2-input" placeholder="Ingrese el valor">
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
        const codigo_ppl = Swal.getPopup().querySelector('#codigo_ppl').value;
        const codigo_exp = Swal.getPopup().querySelector('#codigo_exp').value;
        const codigo_tig = Swal.getPopup().querySelector('#codigo_tig').value;
        const valor = Swal.getPopup().querySelector('#valor').value;

        // Crear el nuevo ingreso
        try {
          await apiService.postIngresos({
            inn_codppl: codigo_ppl,
            inn_codexp: codigo_exp,
            inn_codtig: codigo_tig,
            inn_valor: valor,
          });
          Swal.fire('Creación exitosa', 'El nuevo ingreso ha sido creado.', 'success');
          const dataIngresos = await apiService.getIngresos();
          setingresos(dataIngresos);          
        } catch (error) {
          console.error('Error al crear el ingreso:', error);
          Swal.fire('Error', 'No se pudo crear el ingreso.', 'error');
        }
      }
    });
  };


  //fin metodos sweetalert 
  const accionesBotones = (row) => (
    <div className="opcionesBTN">
      <button type="button" className="btn btn-outline-warning" onClick={() => handleConsultaIngresos(row.id)}><i className="fa-solid fa-info"></i></button>
      <button type="button" className="btn btn-outline-primary custom-tooltip" data-toggle="tooltip" data-placement="top" title="Tooltip on top" onClick={() => handleModificarIngresos(row.id)}><i className="fa-solid fa-pen"></i></button>
      <button type="button" className="btn btn-outline-danger" onClick={() => handleEliminarIngresos(row.id)}><i className="fa-solid fa-trash"></i></button>
    </div>
  );

  const columnas = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Código Periodo Planilla',
      selector: row => row.inn_codppl,
      sortable: true,
    },
    {
      name: 'Código Expediente',
      selector: row => row.inn_codexp,
      sortable: true,
    },
    {
      name: 'Código Tipo Ingreso',
      selector: row => row.inn_codtig,
      sortable: true,
    },
    {
      name: 'Valor',
      selector: row => row.inn_valor,
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
        <h1>Ingresos</h1>
      </div>
      <div class="alineaDerecha ">
        <div className="alineaDerecha">
          <button type="button" className="btn btn-outline-success " onClick={() => handlePostIngresos()}>
            <i className="fa-solid fa-plus"></i> Crear Ingreso
          </button>
        </div>
      </div>
      <TableComponent datostabla={ingresos} columnas={columnas} />
    </div>

  );
};

export default Ingresos;
