import React from "react";
import { Link } from "react-router-dom";


function NavbarEmpleadoComponent() {
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary" >
      <div class="container-fluid">
        <Link class="navbar-brand" to={"/DashboardEmpleado"}>HR360</Link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Marcaciones <i class="fa-solid fa-clock"></i>
              </a>
              <ul class="dropdown-menu">
                <li><Link class="dropdown-item" to={"/Marcacion"}><i class="fa-solid fa-plus"></i>Ingresar Marcacion</Link></li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle p5" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Auto Gestion <i class="fa-solid fa-list-check"></i>
              </a>
              <ul class="dropdown-menu">
                <li><Link class="dropdown-item" to={"/Plazas"}>Constancia Laboral</Link></li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Vacaciones y permisos <i class="fa-solid fa-umbrella-beach"></i>
              </a>
              <ul class="dropdown-menu">
                <li><Link class="dropdown-item" to={"/SolicitudVacaciones"}>Solicitar Vacaciones</Link></li>
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
  )
}

export default NavbarEmpleadoComponent
