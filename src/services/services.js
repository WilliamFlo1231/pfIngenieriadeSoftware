import axios from 'axios';
const urlPPL = 'http://localhost:3000/ppl_periodos_planilla';
const urlCTC = 'http://localhost:3000/cco_centro_costos';
const urlPLZ = 'http://localhost:3000/plz_plazas';
const urlINN = 'http://localhost:3000/inn_ingresos';
const urlTPL = 'http://localhost:3000/tpl_tipo_planilla';
const urlTIG = 'http://localhost:3000/tig_tipos_ingreso';
const urlEXP = 'http://localhost:3000/exp_expedientes';
const urlDSS = 'http://localhost:3000/dss_descuentos';
const urlTDC = 'http://localhost:3000/tdc_tipos_descuentos';
const urlMAR = 'http://localhost:3000/mar_marcas';

const apiService = {

  ////////////////////////// PERIODOS DE PLANILLA //////////////////////////  
  getPeriodoPlanilla: async () => {
    try {
      const response = await axios.get(urlPPL);
      return response.data;
    } catch (error) {
      console.error('Error al realizar la consulta:', error);
    }
  },

  getPeriodoPlanillaId: async (id) => {
    try {
      const response = await axios.get(`${urlPPL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al consultar el Período Planilla por ID:', error);
      throw error;
    }
  },


  deletePeriodoPlanilla: async (id) => {
    const response = await axios.delete(`${urlPPL}/${id}`);
    console.log(response);
  },

  postPeriodoPlanilla: async (nuevoPeriodoPlanilla) => {
    try {
      const response = await axios.post(urlPPL, nuevoPeriodoPlanilla);
      console.log('Nuevo periodo de planilla creado:', response.data);
    } catch (error) {
      console.error('Error al crear el nuevo periodo de planilla:', error);
      throw error;
    }
  },

  updatePeriodoPlanilla: async (id, newData) => {
    try {
      const response = await axios.put(`${urlPPL}/${id}`, newData);
      console.log(response);
    } catch (error) {
      console.error('Error al actualizar el registro de planilla:', error);
    }
  },

  ////////////////////////// INGRESOS //////////////////////////

  getIngresos: async () => {
    try {
      const response = await axios.get(urlINN);
      return response.data;
    } catch (error) {
      console.error('Error al realizar la consulta:', error);
    }
  },

  getIngresosId: async (id) => {
    try {
      const response = await axios.get(`${urlINN}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al consultar el Período Planilla por ID:', error);
      throw error;
    }
  },

  updateIngresos: async (id, newData) => {
    try {
      const response = await axios.put(`${urlINN}/${id}`, newData);
      console.log(response);
    } catch (error) {
      console.error('Error al actualizar el ingreso:', error);
    }
  },

  deleteIngresos: async (id) => {
    const response = await axios.delete(`${urlINN}/${id}`);
    console.log(response);
  },

  postIngresos: async (nuevoIngreso) => {
    try {
      const response = await axios.post(urlINN, nuevoIngreso);
      console.log('Nuevo ingreso creado:', response.data);
    } catch (error) {
      console.error('Error al crear el nuevo ingreso:', error);
      throw error;
    }
  },

  ////////////////////////// DESCUENTOS //////////////////////////

  getDescuentos: async () => {
    try {
      const response = await axios.get(urlDSS);
      return response.data;
    } catch (error) {
      console.error('Error al realizar la consulta:', error);
    }
  },

  getDescuentosId: async (id) => {
    try {
      const response = await axios.get(`${urlDSS}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al consultar el Período Planilla por ID:', error);
      throw error;
    }
  },

  deleteDescuentos: async (id) => {
    const response = await axios.delete(`${urlDSS}/${id}`);
    console.log(response);
  },

  postDescuentos: async (nuevoDescuento) => {
    try {
      const response = await axios.post(urlDSS, nuevoDescuento);
      console.log('Nuevo descuento creado:', response.data);
    } catch (error) {
      console.error('Error al crear el nuevo descuento:', error);
      throw error;
    }
  },

  updateDescuentos: async (id, newData) => {
    try {
      const response = await axios.put(`${urlDSS}/${id}`, newData);
      console.log(response);
    } catch (error) {
      console.error('Error al actualizar el registro de descuento:', error);
    }
  },

  ////////////////////////// EXPEDIENTE //////////////////////////

  getExpedientes: async () => {
    try {
      const response = await axios.get(urlEXP);
      return response.data;
    } catch (error) {
      console.error('Error al realizar la consulta:', error);
    }
  },

  deleteExpediente: async (codigo) => {
    try {
      await axios.delete(`${urlEXP}/${codigo}`);
      console.log(`Expediente con código ${codigo} eliminado`);
    } catch (error) {
      console.error('Error al eliminar el expediente:', error);
    }
  },

  ////////////////////////// PLAZAS //////////////////////////

  getPlazas: async () => {
    try {
      const response = await axios.get(urlPLZ);
      return response.data;
    } catch (error) {
      console.error('Error al obtener plazas:', error);
      throw error;
    }
  },

  getPlazasId: async (id) => {
    try {
      const response = await axios.get(`${urlPLZ}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al consultar la plaza por ID:', error);
      throw error;
    }
  },

  deletePlazas: async (id) => {
    const response = await axios.delete(`${urlPLZ}/${id}`);
    console.log(response);
  },

  postPlazas: async (nuevoIngreso) => {
    try {
      const response = await axios.post(urlPLZ, nuevoIngreso);
      console.log('Nuevo ingreso creado:', response.data);
    } catch (error) {
      console.error('Error al crear la nueva plaza:', error);
      throw error;
    }
  },

  updatePlazas: async (id, newData) => {
    try {
      const response = await axios.put(`${urlPLZ}/${id}`, newData);
      console.log(response);
    } catch (error) {
      console.error('Error al actualizar la plaza:', error);
    }
  },

  ////////////////////////// MARCAS //////////////////////////

  getMarcas: async () => {
    const response = await axios.get(urlMAR);
    return response.data;
    // console.log(response.data);
  },

  deleteMarca: async (id) => {
    const response = await axios.delete(`${urlMAR}/${id}`);
    console.log(response);
  },  

  ////////////////////////// CENTRO DE COSTOS //////////////////////////

  getCentroDeCosto: async () => {
    try {
      const response = await axios.get(urlCTC);
      return response.data;
    } catch (error) {
      console.error('Error al obtener centro de costo:', error);
      throw error;
    }
  },

  ////////////////////////// TIPO DE PLANILLA //////////////////////////

  getTipoPlanilla: async () => {
    try {
      const response = await axios.get(urlTPL);
      return response.data;
    } catch (error) {
      console.error('Error al realizar la consulta:', error);
    }
  },

  ////////////////////////// TIPO DE INGRESO //////////////////////////
  getTipoIngreso: async () => {
    try {
      const response = await axios.get(urlTIG);
      return response.data;
    } catch (error) {
      console.error('Error al realizar la consulta:', error);
    }
  },

  ////////////////////////// TIPO DESCUENTOS //////////////////////////  
  getTipoDescuento: async () => {
    try {
      const response = await axios.get(urlTDC);
      return response.data;
    } catch (error) {
      console.error('Error al realizar la consulta:', error);
    }
  }

};

export default apiService;