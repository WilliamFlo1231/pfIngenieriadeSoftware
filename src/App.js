import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HorasExtra from './pages/HorasExtra';
import Marcaciones from './pages/Marcaciones';
import AutoGestion from './pages/AutoGestion';
import Marcacion from './pages/Marcacion';
import IngresoExpediente from './pages/IngresoExpediente';
import SolicitudPermisos from './pages/SolicitudPermisos';
import SolicitudVacaciones from './pages/SolicitudVacaciones';
import PeriodoPlanilla from './pages/PeriodoPlanilla';
import ConsultaExpedientes from './pages/ConsultaExpedientes';
import Descuentos from './pages/Descuentos';
import Ingresos from './pages/Ingresos';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Plazas from './pages/Plazas';
import ModificarExpediente from './pages/ModificarExpediente';
import DashboardEmpleado from './pages/DashboardEmpleado';
import ConsultaSolicitudVacaciones from './pages/ConsultaSolicitudVacaciones';
import HistorialPago from './pages/HistorialPago';
import PrivateRoute from './utils/PrivateRoute';
import PrivateRouteAdmin from './utils/PrivateRouteAdmin';

function App() {
  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route element={<PrivateRoute/>}>
            <Route path="/AutoGestion" element={<AutoGestion />} />
            <Route path="/Marcacion" element={<Marcacion />} />
            <Route path="/SolicitudPermisos" element={<SolicitudPermisos />} />
            <Route path="/SolicitudVacaciones" element={<SolicitudVacaciones />} />
            <Route path="/DashboardEmpleado" element={<DashboardEmpleado />} />
            <Route path="/HistorialPago" element={<HistorialPago />} />
          </Route>
          <Route element={<PrivateRouteAdmin/>}>
            <Route path="/ConsultaSolicitudVacaciones" element={<ConsultaSolicitudVacaciones />} />
            <Route path="/ConsultaPeriodoPlanilla" element={<PeriodoPlanilla />} />
            <Route path="/ConsultaExpedientes" element={<ConsultaExpedientes />} />
            <Route path="/ModificarExpediente/:id" element={<ModificarExpediente />} />
            <Route path="/IngresoExpediente" element={<IngresoExpediente />} />
            <Route path="/Marcaciones" element={<Marcaciones />} />
            <Route path="/HorasExtra" element={<HorasExtra />} />
            <Route path="/ConsultaDescuentos" element={<Descuentos />} />
            <Route path="/ConsultaIngresos" element={<Ingresos />} />
            <Route path="/DashboardAdmin" element={<Dashboard />} />
            <Route path="/Plazas" element={<Plazas />} />
          </Route>  


        </Routes>
      </Router>
    </div>

  );
}

export default App;


