import React, { useState, useEffect } from 'react';
import NavbarComponent from '../components/NavbarComponent';
import Reloj from '../components/Reloj';
import TableComponent from '../components/TableComponent';
import axios from 'axios'


const RegistroBotones = ({ onRegistro }) => {
  return (
    <div className="text-center">
      {/* Mostrar el componente Reloj */}
      <Reloj />

      <div className="btn-group mt-4">
        <button className="btn btn-primary mr-2" onClick={() => onRegistro('Entrada')}>
          Entrada
        </button>
        <button className="btn btn-primary mr-2" onClick={() => onRegistro('Inicio Almuerzo')}>
          Inicio Almuerzo
        </button>
        <button className="btn btn-primary mr-2" onClick={() => onRegistro('Fin Almuerzo')}>
          Fin Almuerzo
        </button>
        <button className="btn btn-primary mr-2" onClick={() => onRegistro('Inicio Receso')}>
          Inicio Receso
        </button>
        <button className="btn btn-primary mr-2" onClick={() => onRegistro('Fin Receso')}>
          Fin Receso
        </button>
        <button className="btn btn-primary" onClick={() => onRegistro('Salida')}>
          Salida
        </button>
      </div>
    </div>
  );
};




const Marcacion = () => {
  const url = "  http://localhost:3000/mar_marcas"
  const [marcas, setMarcas] = useState([]);
  const [id, setId] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [tipoMarca, setTipoMarca] = useState('');

  useEffect(() => {
    getMarcas();
  }
    , []);

  const getMarcas = async () => {
    const response = await axios.get(url);
    setMarcas(response.data);
  }

  const postMarcas = async () => { 
    const response = await axios.post(url, {
      id: id,
      mar_fecha: fecha,
      mar_hora: hora,
      mar_estado: tipoMarca
    });
  }

  useEffect(() => {
    if (id !== '' && fecha !== '' && hora !== '' && tipoMarca !== '') {
      postMarcas();
    }
  }, [id, fecha, hora, tipoMarca]);


  const handleRegistro = (tipo) => {
    const now = new Date();
    const fechaActual = now.toLocaleDateString();
    setFecha(fechaActual);
    const horaActual = now.toLocaleTimeString();
    setHora(horaActual);
    setTipoMarca(tipo);
    setId(marcas.length + 1);        
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
      <NavbarComponent />
      <div className="titulo">
        <h1 className="text-center">Registro de Actividades Diarias</h1>
      </div>
      <RegistroBotones onRegistro={handleRegistro} />
      <hr />
      <TableComponent datostabla={marcas} columnas={columnas}/>
    </div>
  );
};

export default Marcacion;