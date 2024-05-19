import React, { useState, useEffect } from 'react';
import NavbarComponent from '../components/NavbarComponent';
import TableComponent from '../components/TableComponent';
import Swal from 'sweetalert2';
import axios from 'axios';

const Ingresos = () => {
  const url = "http://localhost:3000/ingresos";
  const [ingresos, setingresos] = useState([]);

  const urlPPL = "http://localhost:3000/periodos_planilla";
  const [periodoPlanilla, setPeriodoPlanilla] = useState([]);

  const urlEXP = "http://localhost:3000/expediente";
  const [expendiente, setExpediente] = useState([]);

  const urlTIG = "http://localhost:3000/tipo_ingreso";
  const [tipoIngreso, setTipoIngreso] = useState([]);

  useEffect(() => {
    getIngresos();
    getExpendiente();
    getTipoIngreso();
    getPeriodoPlanilla();
  }, []);

  //funciones para crud
  const getIngresos = async () => {
    try {
      const response = await axios.get(url);
      setingresos(response.data);
    } catch (error) {
      console.error('Error al realizar la consulta:', error);
    }
  };

  const getExpendiente = async () => {
    try {
      const response = await axios.get(urlEXP);
      setExpediente(response.data);
    } catch (error) {
      console.error('Error al realizar la consulta:', error);
    }
  }

  const getTipoIngreso = async () => {
    try {
      const response = await axios.get(urlTIG);
      setTipoIngreso(response.data);
    } catch (error) {
      console.error('Error al realizar la consulta:', error);
    }
  }
  const getPeriodoPlanilla = async () => {
    try {
      const response = await axios.get(urlPPL);
      setPeriodoPlanilla(response.data);
    } catch (error) {
      console.error('Error al realizar la consulta:', error);
    }
  }

  const getIngresosId = async (id) => {
    try {
      const response = await axios.get(`${url}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al consultar el Período Planilla por ID:', error);
      throw error;
    }
  };

  const deleteIngresos = async (id) => {
    const response = await axios.delete(`${url}/${id}`);
    console.log(response);
    getIngresos();
  }

  const postIngresos = async (nuevoIngreso) => {
    try {
      const response = await axios.post(url, nuevoIngreso);
      console.log('Nuevo ingreso creado:', response.data);
      getIngresos(); // Actualiza la lista después de crear el ingereso
    } catch (error) {
      console.error('Error al crear el nuevo ingreso:', error);
      throw error;
    }
  };

  const updateIngresos = async (id, newData) => {
    try {
      const response = await axios.put(`${url}/${id}`, newData);
      console.log(response);
      getIngresos();
    } catch (error) {
      console.error('Error al actualizar el ingreso:', error);
    }
  };

  //metodos para sweetalert
  const handleConsultaIngresos = async (id) => {
    try {
      const ingresos = await getIngresosId(id);
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
      await getExpendiente();
      await getTipoIngreso();
      await getPeriodoPlanilla();
      const ingresos = await getIngresosId(id);
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
          updateIngresos(ingresos.id, {
            inn_codppl: codigo_ppl,
            inn_codexp: codigo_exp,
            inn_codtig: codigo_tig,
            inn_valor: valor,

          });
        }
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Actualización confirmada', '', 'success');
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
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí puedes agregar la lógica para eliminar la ingresos
        deleteIngresos(id);
        console.log('ingreso eliminada');
      }
    });
  };

  const handlePostIngresos = async () => {
    // Espera a que se resuelva la promesa de los tres get
    await getExpendiente();
    await getTipoIngreso();
    await getPeriodoPlanilla();

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
          await postIngresos({
            inn_codppl: codigo_ppl,
            inn_codexp: codigo_exp,
            inn_codtig: codigo_tig,
            inn_valor: valor,
          });
          Swal.fire('Creación exitosa', 'El nuevo ingreso ha sido creado.', 'success');
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
