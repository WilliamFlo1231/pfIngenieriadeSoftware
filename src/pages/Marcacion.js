import React, { useState, useEffect } from 'react';
import Reloj from '../components/Reloj';
import TableComponent from '../components/TableComponent';
import NavbarEmpleadoComponent from '../components/NavbarEmpleadoComponent';
import apiService from '../services/services';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';




const RegistroBotones = ({ tipoMarcas, onRegistro }) => {



  return (
    <div className="text-center">
      {/* Mostrar el componente Reloj */}
      <Reloj />

      <div className="btn-group mt-4">
        {tipoMarcas.map((tipoMarca, index) => (
          <button
            key={index}
            className="btn btn-primary mr-2"
            onClick={() => onRegistro(tipoMarca.id)}
          >{tipoMarca.tma_descripcion}
            {tipoMarca.tpm_descripcion}
          </button>
        ))}
      </div>
    </div>
  );
};




const Marcacion = () => {
  const user = Cookies.get('user');
  var userData = {};
  if (user) {
    userData = JSON.parse(user);
    console.log(userData.expid);
  }

  const [marcas, setMarcas] = useState([]);
  const [tipoMarcas, setTipoMarcas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataMarcas = await apiService.getMarcas();
        setMarcas(dataMarcas);

        const dataTipoMarcas = await apiService.getTipoMarcas();
        setTipoMarcas(dataTipoMarcas);

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

  const filtraMarcaciones = marcas.filter((marca) => marca.mar_codexp === parseInt(userData.expid));

  const handleRegistro = (tipo) => {
    const now = new Date();
    const fechaActual = now.toLocaleDateString();
    const horaActual = now.toLocaleTimeString();
    const marca = {
      mar_hora: horaActual,
      mar_fecha: fechaActual,
      mar_codtma: tipo,
      mar_codexp: parseInt(userData.expid),
    };

    apiService.postMarca(marca);
    window.location.reload();
  };

  const columnas = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Hora Marca',
      selector: row => row.mar_hora,
      sortable: true,
    },
    {
      name: 'Tipo de Marca',
      selector: row => row.mar_estado,
      sortable: true,
    },
  ];

  return (
    <div>
      <NavbarEmpleadoComponent />
      <div className="titulo">
        <h1 className="text-center">Registro de Actividades Diarias</h1>
      </div>
      <RegistroBotones tipoMarcas={tipoMarcas} onRegistro={handleRegistro} />
      <hr />
      <TableComponent datostabla={filtraMarcaciones} columnas={columnas} />
    </div>
  );
};

export default Marcacion;