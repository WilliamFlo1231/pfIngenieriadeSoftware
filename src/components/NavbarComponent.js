import React from "react";
import { Link } from "react-router-dom";

const NavbarComponent = () => {
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div class="container-fluid">
        <Link class="navbar-brand" to={"/DashboardAdmin"}>HR360</Link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Expedientes <i class="fa-solid fa-person"></i>
              </a>
              <ul class="dropdown-menu">
                <li><Link class="dropdown-item" to={"/ConsultaExpedientes"}><i class="fa-solid fa-magnifying-glass"></i> Consulta de Expediente</Link></li>
                <li><Link class="dropdown-item" to={"/IngresoExpediente"}><i class="fa-solid fa-plus"></i> Ingreso de Expediente</Link></li>
                <li><Link class="dropdown-item" to={"/ConsultaExpedientes"}><i class="fa-solid fa-pencil"></i> Modificacion de expediente</Link></li>
                <li><Link class="dropdown-item" to={"/Marcaciones"}>Marcaciones</Link></li>
                <li><Link class="dropdown-item" to={"/Plazas"}>Plazas</Link></li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle p5" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Apartado Salarial <i class="fa-solid fa-dollar-sign"></i>
              </a>
              <ul class="dropdown-menu">
                <li><Link class="dropdown-item" to={"/Plazas"}>Historial de pago</Link></li>
                <li><Link class="dropdown-item" to={"/ConsultaDescuentos"}>Descuentos</Link></li>
                <li><Link class="dropdown-item" to={"/ConsultaIngresos"}>Ingresos</Link></li>
                <li><Link class="dropdown-item" to={"/ConsultaPeriodoPlanilla"}>Periodos de Planilla</Link></li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Vacaciones y permisos <i class="fa-solid fa-umbrella-beach"></i>
              </a>
              <ul class="dropdown-menu">
                <li><Link class="dropdown-item" to={"/ConsultaSolicitudVacaciones"}>Consulta Vacaciones</Link></li>
              </ul>
            </li>
          </ul>
          <div class="d-flex">
            <Link to={"/Login"}>
              <button class="btn btn-outline-danger px-4" >Salir</button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavbarComponent;