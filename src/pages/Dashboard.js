import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import NavbarComponent from '../components/NavbarComponent';
import CardComponent from '../components/CardComponent';
import apiService from '../services/services';




function Dashboard() {
  const [expedientes, setExpedientes] = useState([]);
  const [totalExpedientes, setTotalExpedientes] = useState(0); // Estado para almacenar el total de expedientes

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataExpedientes = await apiService.getExpedientes();
        setExpedientes(dataExpedientes);
        // Contar el total de expedientes
        const total = dataExpedientes.length;
        setTotalExpedientes(total);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div>
      <NavbarComponent />
      <div class="container-fluid">
        <div className="titulo">
          <h1>Dashboard HR360</h1>
        </div>

        <div class="d-sm-flex align-items-center justify-content-between mb-4">

          <Link class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i class="fas fa-download fa-sm text-white-50"></i> Generate Report</Link>
        </div>

        <div class="row">
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
            quantity={"Q215,000"}
            tipoTexto={"text-info"}
            tipoBorde={"border-left-info"}
          />

          <CardComponent
            title="Horas extras pendientes de autorizar"
            iconClass="fas fa-dollar-sign"
            quantity={"5"}
            tipoTexto={"text-primary"}
            tipoBorde={"border-left-primary"}
          />

          <CardComponent
            title="Pendiente"
            iconClass="fas fa-comments"
            quantity={"18"}
            tipoTexto={"text-warning"}
            tipoBorde={"border-left-warning"}
          />

        </div>



        <div class="row">


          <div class="col-xl-8 col-lg-7">
            <div class="card shadow mb-4">

              <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">Earnings Overview</h6>
                <div class="dropdown no-arrow">
                  <Link class="dropdown-toggle" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                  </Link>
                  <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                    <div class="dropdown-header">Dropdown Header:</div>
                    <Link class="dropdown-item" >Action</Link>
                    <Link class="dropdown-item" >Another action</Link>
                    <div class="dropdown-divider"></div>
                    <Link class="dropdown-item" >Something else her</Link>
                  </div>
                </div>
              </div>

              <div class="card-body">
                <div class="chart-area"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                  <canvas id="myAreaChart" width="967" height="400" style={{ display: "block", height: "320px", width: "774px" }} class="chartjs-render-monitor"></canvas>
                </div>
              </div>
            </div>
          </div>


          <div class="col-xl-4 col-lg-5">
            <div class="card shadow mb-4">

              <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">Revenue Sources</h6>
                <div class="dropdown no-arrow">
                  <Link class="dropdown-toggle" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                  </Link>
                  <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                    <div class="dropdown-header">Dropdown Header:</div>
                    <Link class="dropdown-item" >Action</Link>
                    <Link class="dropdown-item" >Another action</Link>
                    <div class="dropdown-divider"></div>
                    <Link class="dropdown-item" >Something else here</Link>
                  </div>
                </div>
              </div>

              <div class="card-body">
                <div class="chart-pie pt-4 pb-2"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                  <canvas id="myPieChart" width="967" height="306" style={{ display: "block", height: "245px", width: "774px" }} class="chartjs-render-monitor"></canvas>
                </div>
                <div class="mt-4 text-center small">
                  <span class="mr-2">
                    <i class="fas fa-circle text-primary"></i> Direct
                  </span>
                  <span class="mr-2">
                    <i class="fas fa-circle text-success"></i> Social
                  </span>
                  <span class="mr-2">
                    <i class="fas fa-circle text-info"></i> Referral
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div class="row">


          <div class="col-lg-6 mb-4">


            <div class="card shadow mb-4">
              <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Projects</h6>
              </div>
              <div class="card-body">
                <h4 class="small font-weight-bold">Server Migration <span class="float-right">20%</span></h4>
                <div class="progress mb-4">
                  <div class="progress-bar bg-danger" role="progressbar" style={{ width: "40%" }} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <h4 class="small font-weight-bold">Sales Tracking <span class="float-right">40%</span></h4>
                <div class="progress mb-4">
                  <div class="progress-bar bg-warning" role="progressbar" style={{ width: "40%" }} aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <h4 class="small font-weight-bold">Customer Database <span class="float-right">60%</span></h4>
                <div class="progress mb-4">
                  <div class="progress-bar" role="progressbar" style={{ width: "60%" }} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <h4 class="small font-weight-bold">Payout Details <span class="float-right">80%</span></h4>
                <div class="progress mb-4">
                  <div class="progress-bar bg-info" role="progressbar" style={{ width: "80%" }} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <h4 class="small font-weight-bold">Account Setup <span class="float-right">Complete!</span></h4>
                <div class="progress">
                  <div class="progress-bar bg-success" role="progressbar" style={{ width: "100%" }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </div>




          </div>

          <div class="col-lg-6 mb-4">


            <div class="card shadow mb-4">
              <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Illustrations</h6>
              </div>
              <div class="card-body">
                <div class="text-center">
                </div>
                <p>Add some quality, svg illustrations to your project courtesy of <Link rel="nofollow" href="https://undraw.co/">unDraw</Link>, a
                  constantly updated collection of beautiful svg images that you can use
                  completely free and without attribution!</p>
                <Link rel="nofollow" href="https://undraw.co/">Browse Illustrations on
                  unDraw →</Link>
              </div>
            </div>


            <div class="card shadow mb-4">
              <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Development Approach</h6>
              </div>
              <div class="card-body">
                <p>SB Admin 2 makes extensive use of Bootstrap 4 utility classes in order to reduce
                  CSS bloat and poor page performance. Custom CSS classes are used to create
                  custom components and custom utility classes.</p>
                <p class="mb-0">Before working with this theme, you should become familiar with the
                  Bootstrap framework, especially the utility classes.</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard
