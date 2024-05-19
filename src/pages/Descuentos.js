import React, { useState, useEffect } from 'react';
import NavbarComponent from '../components/NavbarComponent';
import TableComponent from '../components/TableComponent';
import Swal from 'sweetalert2';
import axios from 'axios';

const Descuentos = () => {
  const url = "http://localhost:3000/dss_descuentos";
  const [descuentos, setdescuentos] = useState([]);

  const urlEXP = "http://localhost:3000/expediente";
  const [expediente, setExpediente] = useState([]);

  const urlPPL = "http://localhost:3000/periodos_planilla";
  const [periodoPlanilla, setPeriodoPlanilla] = useState([]);

  const urlTDC = "http://localhost:3000/tdc_tipo_descuento";
  const [tipoDescuento, setTipoDescuento] = useState([]);  



  useEffect(() => {
    getDescuentos();
    getExpediente();
    getPeriodoPlanilla();
    getTipoDescuento();
  }, []);

  //funciones para crud
  const getDescuentos = async () => {
    try {
      const response = await axios.get(url);
      setdescuentos(response.data);
    } catch (error) {
      console.error('Error al realizar la consulta:', error);
    }
  };

  const getExpediente = async () => {
    try {
      const response = await axios.get(urlEXP);
      setExpediente(response.data);
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

  const getTipoDescuento = async () => {
    try {
      const response = await axios.get(urlTDC);
      setTipoDescuento(response.data);
    } catch (error) {
      console.error('Error al realizar la consulta:', error);
    }
  }

  const getDescuentosId = async (id) => {
    try {
      const response = await axios.get(`${url}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al consultar el Período Planilla por ID:', error);
      throw error;
    }
  };

  const deleteDescuentos = async (id) => {
    const response = await axios.delete(`${url}/${id}`);
    console.log(response);
    getDescuentos();
  }

  const postDescuentos = async (nuevoDescuento) => {
    try {
      const response = await axios.post(url, nuevoDescuento);
      console.log('Nuevo descuento creado:', response.data);
      getDescuentos(); // Actualiza la lista después de crear el nuevo descuento
    } catch (error) {
      console.error('Error al crear el nuevo descuento:', error);
      throw error;
    }
  };

  const updateDescuentos = async (id, newData) => {
    try {
      const response = await axios.put(`${url}/${id}`, newData);
      console.log(response);
      getDescuentos();
    } catch (error) {
      console.error('Error al actualizar el registro de descuento:', error);
    }
  };

  //metodos para sweetalert
  const handleConsultaDescuentos = async (id) => {
    try {
      const descuentos = await getDescuentosId(id);
      Swal.fire({
        title: 'Información del Descuento',
        html: `
          <div style="text-align: left;">
            <p><strong>ID:</strong> ${descuentos.id}</p>
            <p><strong>Código EXP:</strong> ${descuentos.dss_codexp}</p>
            <p><strong>Código PPL:</strong> ${descuentos.dss_codppl}</p>
            <p><strong>Código TDC:</strong> ${descuentos.dss_codtdc}</p>
            <p><strong>Valor:</strong> ${descuentos.dss_valor}</p>
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

  const handleModificarDescuentos = async (id) => {
    try {
      await getExpediente();
      await getPeriodoPlanilla();
      await getTipoDescuento();
      const descuentos = await getDescuentosId(id);
      Swal.fire({
        title: 'Modificar Descuento',
        html: `
          <div style="text-align: left;">
            <label for="codigo_exp">Código EXP:</label>
            <br/>
            <select id="codigo_exp" class="swal2-select">
            ${expediente.map(option => `<option value="${descuentos.dss_codexp}">${option.exp_nombres}</option>`).join('')}
          </select>
            <br/>
            <div style="text-align: left;">
            <label for="codigo_ppl">Código PPL:</label>
            <br/>
            <select id="codigo_ppl" class="swal2-select">
            ${periodoPlanilla.map(option => `<option value="${descuentos.dss_codppl}">${option.id}</option>`).join('')}
          </select>
            <br/>
            <div style="text-align: left;">
            <label for="codigo_tdc">Código TDC:</label>
            <br/>
            <select id="codigo_tdc" class="swal2-select">
            ${tipoDescuento.map(option => `<option value="${descuentos.dss_codtdc}">${option.tdc_descripcion}</option>`).join('')}
          </select>
            <br/>                        
            <label for="valor">Valor:</label>
            <br/>
            <input type="number" id="valor" class="swal2-input" placeholder="Ingrese el Valor" value="${descuentos.dss_valor}">
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
          const codigo_exp = Swal.getPopup().querySelector('#codigo_exp').value;
          const codigo_ppl = Swal.getPopup().querySelector('#codigo_ppl').value;
          const codigo_tdc = Swal.getPopup().querySelector('#codigo_tdc').value;
          const valor = Swal.getPopup().querySelector('#valor').value;

          // Llamar a la función para actualizar el descuento
          updateDescuentos(descuentos.id, {
            dss_codexp: codigo_exp,
            dss_codppl: codigo_ppl,
            dss_codtdc: codigo_tdc,
            dss_valor: valor
          });
        }
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Actualización confirmada', '', 'success');
        }
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

  const handleEliminarDescuentos = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar este descuento?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí puedes agregar la lógica para eliminar la descuentos
        deleteDescuentos(id);
        console.log('descuento eliminado');
      }
    });
  };

  const handlePostdescuentos = async () => {
    // Espera a que se resuelva la promesa de getTipoPlanilla
    await getExpediente();
    await getPeriodoPlanilla();
    await getTipoDescuento()

    // Ahora tipoPlanilla tiene los datos actualizados
    Swal.fire({
      title: 'Crear Periodo Planilla',
      html: `
      <div style="text-align: left;">
      <label for="codigo_exp">Código EXP:</label>
      <br/>
      <select id="codigo_exp" class="swal2-select">
      ${expediente.map(option => `<option value="${option.id}">${option.exp_nombres}</option>`).join('')}
    </select>
      <br/>
      <div style="text-align: left;">
      <label for="codigo_ppl">Código PPL:</label>
      <br/>
      <select id="codigo_ppl" class="swal2-select">
      ${periodoPlanilla.map(option => `<option value="${option.id}">${option.id}</option>`).join('')}
    </select>
      <br/>
      <div style="text-align: left;">
      <label for="codigo_tdc">Código TDC:</label>
      <br/>
      <select id="codigo_tdc" class="swal2-select">
      ${tipoDescuento.map(option => `<option value="${option.id}">${option.tdc_descripcion}</option>`).join('')}
    </select>
      <br/>                        
      <label for="valor">Valor:</label>
      <br/>
      <input type="number" id="valor" class="swal2-input" placeholder="Ingrese el Valor">
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
          // Obtener los valores de los inputs
          const codigo_exp = Swal.getPopup().querySelector('#codigo_exp').value;
          const codigo_ppl = Swal.getPopup().querySelector('#codigo_ppl').value;
          const codigo_tdc = Swal.getPopup().querySelector('#codigo_tdc').value;
          const valor = Swal.getPopup().querySelector('#valor').value;

        // Crear el nuevo descuento
        try {
          await postDescuentos({
            dss_codexp: codigo_exp,
            dss_codppl: codigo_ppl,
            dss_codtdc: codigo_tdc,
            dss_valor: valor
          });
          Swal.fire('Creación exitosa', 'El nuevo descuento ha sido creado.', 'success');
        } catch (error) {
          console.error('Error al crear el descuento:', error);
          Swal.fire('Error', 'No se pudo crear el nuevo descuento.', 'error');
        }
      }
    });
  };


  //fin metodos sweetalert 
  const accionesBotones = (row) => (
    <div className="opcionesBTN">
      <button type="button" className="btn btn-outline-warning" onClick={() => handleConsultaDescuentos(row.id)}><i className="fa-solid fa-info"></i></button>
      <button type="button" className="btn btn-outline-primary custom-tooltip" data-toggle="tooltip" data-placement="top" title="Tooltip on top" onClick={() => handleModificarDescuentos(row.id)}><i className="fa-solid fa-pen"></i></button>
      <button type="button" className="btn btn-outline-danger" onClick={() => handleEliminarDescuentos(row.id)}><i className="fa-solid fa-trash"></i></button>
    </div>
  );

  const columnas = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Código Expediente',
      selector: row => row.dss_codexp,
      sortable: true,
    },
    {
      name: 'Codigo Periodo Planilla',
      selector: row => row.dss_codppl,
      sortable: true,
    },
    {
      name: 'Codigo Valor Descuento',
      selector: row => row.dss_valor,
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
        <h1>Descuentos</h1>
      </div>
      <div class="alineaDerecha ">
        <div className="alineaDerecha">
          <button type="button" className="btn btn-outline-success " onClick={() => handlePostdescuentos()}>
            <i className="fa-solid fa-plus"></i> Crear Descuento
          </button>
        </div>
      </div>
      <TableComponent datostabla={descuentos} columnas={columnas} />
    </div>

  );
};

export default Descuentos;
