import React from 'react'
import NavbarEmpleadoComponent from '../components/NavbarEmpleadoComponent'
import CardEmpleado from '../components/CardEmpleado'
import { Link } from 'react-router-dom'

function DashboardEmpleado() {
  return (
    <div>
      <NavbarEmpleadoComponent />
      <div className="titulo">
        <h1>Bienvenido Juan Perez</h1>
      </div>
      <p style={{ textAlign: "center" }}>¿Que deseas hacer?</p>
      <div class="row row-cols-1 row-cols-md-4 g-4 px-5 ancho80">
        <Link style={{ textDecoration: "none" }} to={"/Marcacion"}>
          <CardEmpleado 
            titulo="Ingresar Marcacion"
            imagen={"https://th.bing.com/th/id/R.5d028aad5cd1340daaf1bcc9e373fb92?rik=M8wtOwJ8dxTAAA&pid=ImgRaw&r=0"}/>
        </Link>
        <Link style={{ textDecoration: "none" }} to={"/Marcacion"}>
          <CardEmpleado 
            titulo="Generar Constancia Laboral"
            imagen={"https://img.freepik.com/free-vector/big-isolated-employee-working-office-workplace-flat-illustration_1150-41780.jpg?t=st=1716741373~exp=1716744973~hmac=2b34406790374fa3fe7cf6f499e3ea47b9a54aea2f0fc705b23d44ecff472c71&w=996"}/>
        </Link>
        <Link style={{ textDecoration: "none" }} to={"/SolicitudVacaciones"}>
          <CardEmpleado 
            titulo="Solicitar Vacaciones"
            imagen={"https://img.freepik.com/free-psd/travel-sales-background_23-2150350125.jpg?t=st=1716741427~exp=1716745027~hmac=ab4a5b4174e0bab423451cfca1277f25b743e7cdcd41156b410725988647dd25&w=996"}/>
        </Link>
        <Link style={{ textDecoration: "none" }} to={"/Marcacion"}>
          <CardEmpleado 
            titulo="Ver Historial de Pago"
            imagen={"https://img.freepik.com/free-vector/hand-drawn-brazilian-payment-book-template_23-2149890130.jpg?t=st=1716741578~exp=1716745178~hmac=24d0fa111a2799bdcb1b5b579338f4d73f65dc366d8083a2ff8f567fb35c44c6&w=996"}/>
        </Link>


      </div>
    </div>
  )
}

export default DashboardEmpleado
