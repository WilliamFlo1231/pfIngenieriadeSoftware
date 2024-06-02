import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import NavbarComponent from '../components/NavbarComponent';
import CardComponent from '../components/CardComponent';
import apiService from '../services/services';
import SolicitudVacacionesChart from '../components/SolicitudVacacionesChart'; 
import SolicitudVacacionesPieChart from '../components/SolicitudVacacionesPieChart'; // Importar el nuevo componente

function Dashboard() {
  const [expedientes, setExpedientes] = useState([]);
  const [totalExpedientes, setTotalExpedientes] = useState(0);
  const [plazas, setPlazas] = useState([]);
  const [totalPlazas, setTotalPlazas] = useState(0);
  const [solicitudVacaciones, setSolicitudVacaciones] = useState([]);
  const [totalSolicitudVacaciones, setTotalSolicitudVacaciones] = useState(0);
  const [marcaciones, setMarcaciones] = useState([]); 
  const [totalMarcaciones, setTotalMarcaciones] = useState(0);
  const [vacacionesPorMes, setVacacionesPorMes] = useState([0, 0, 0]);
  const [vacacionesPorEstado, setVacacionesPorEstado] = useState([0, 0, 0]); // Nuevo estado para el gráfico de pie

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataExpedientes = await apiService.getExpedientes();
        setExpedientes(dataExpedientes);
        const dataPlazas = await apiService.getPlazas();
        setPlazas(dataPlazas);
        const dataSolicitudVacaciones = await apiService.getSolicitudVacaciones();
        setSolicitudVacaciones(dataSolicitudVacaciones);
        const dataMarcaciones = await apiService.getMarcas();
        setMarcaciones(dataMarcaciones);        
        setTotalExpedientes(dataExpedientes.length);
        setTotalPlazas(dataPlazas.length);
        setTotalMarcaciones(dataMarcaciones.length);
        setTotalSolicitudVacaciones(dataSolicitudVacaciones.length);



        const currentMonth = new Date().getMonth();
        const counts = [0, 0, 0];
        const estadoCounts = { "Pendiente Aprobacion": 0, "Autorizado": 0, "Rechazado": 0 };

        dataSolicitudVacaciones.forEach((solicitud) => {
          const solicitudMonth = new Date(solicitud.sdv_fecha_solicitud).getMonth();
          if (solicitudMonth >= currentMonth - 2 && solicitudMonth <= currentMonth) {
            counts[solicitudMonth - (currentMonth - 2)]++;
          }
          estadoCounts[solicitud.sdv_estado]++;
        });
        setVacacionesPorMes(counts);
        setVacacionesPorEstado([estadoCounts["Pendiente Aprobacion"], estadoCounts["Autorizado"], estadoCounts["Rechazado"]]);

      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []);

  const cuentaVacacionesPendientes = () => {
    let contador = 0;
    solicitudVacaciones.forEach((solicitud) => {
      if (solicitud.sdv_estado === "Pendiente Aprobacion") {
        contador++;
      }
    });
    return contador;
  };

  const totaVacasPendientes = cuentaVacacionesPendientes();

  return (
    <div>
      <NavbarComponent />
      <div className="container-fluid">
        <div className="titulo">
          <h1>Dashboard HR360</h1>
        </div>


        <div className="row">
          <CardComponent
            title="Total Expedientes"
            iconClass="fa-solid fa-person"
            quantity={totalExpedientes}
            enlace={"/ConsultaExpedientes"}
            tipoTexto={"text-success"}
            tipoBorde={"border-left-success"}
          />
          <CardComponent
            title="Vacaciones pendientes de autorizar"
            iconClass="fas fa-dollar-sign"
            quantity={totaVacasPendientes}
            tipoTexto={"text-info"}
            enlace={"/ConsultaSolicitudVacaciones"}
            tipoBorde={"border-left-info"}
          />
          <CardComponent
            title="Total Marcaciones"
            iconClass="fas fa-dollar-sign"
            quantity={totalMarcaciones}
            tipoTexto={"text-primary"}
            tipoBorde={"border-left-primary"}
            enlace={"/Marcaciones"}
          />
          <CardComponent
            title="Plazas totales"
            iconClass="fas fa-comments"
            quantity={totalPlazas}
            tipoTexto={"text-warning"}
            tipoBorde={"border-left-warning"}
            enlace={"/Plazas"}
          />
        </div>

        <div className="row">
          <div className="col-xl-8 col-lg-7">
            <div className="card shadow mb-4">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">Vacaciones por Mes</h6>
              </div>
              <div className="card-body">
                <div className="chart-area">
                <SolicitudVacacionesChart data={vacacionesPorMes} />
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-lg-5">
            <div className="card shadow mb-4">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">Solicitudes de Vacaciones por Estado</h6>
                <div className="dropdown no-arrow">
                  <Link className="dropdown-toggle" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                  </Link>
                  <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                    <div className="dropdown-header">Dropdown Header:</div>
                    <Link className="dropdown-item">Action</Link>
                    <Link className="dropdown-item">Another action</Link>
                    <div className="dropdown-divider"></div>
                    <Link className="dropdown-item">Something else here</Link>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="chart-pie pt-4 pb-2">
                  <SolicitudVacacionesPieChart data={vacacionesPorEstado} />
                </div>
                <div className="mt-4 text-center small">
                  <span className="mr-2">
                    <i className="fas fa-circle text-primary"></i> Pendiente Aprobacion
                  </span>
                  <span className="mr-2">
                    <i className="fas fa-circle text-success"></i> Autorizado
                  </span>
                  <span className="mr-2">
                    <i className="fas fa-circle text-danger"></i> Rechazado
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>       

        <div className="row">
          <div className="col-lg-6 mb-4">
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
