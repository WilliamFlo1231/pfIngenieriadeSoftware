import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
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

function App() {
  return (
    <div className="App">
      
        <Router>
          <Routes>
            <Route path="/" element={<Landing/>} />
            <Route path="/HorasExtra" element={<HorasExtra/>} />
            <Route path="/Marcaciones" element={<Marcaciones/>} />
            <Route path="/AutoGestion" element={<AutoGestion/>} />
            <Route path="/Marcacion" element={<Marcacion/>} />
            <Route path="/IngresoExpediente" element={<IngresoExpediente/>} />
            <Route path="/SolicitudPermisos" element={<SolicitudPermisos/>} />
            <Route path="/SolicitudVacaciones" element={<SolicitudVacaciones/>} />
            <Route path="/ConsultaPeriodoPlanilla" element={<PeriodoPlanilla/>} />
            <Route path="/ConsultaExpedientes" element={<ConsultaExpedientes/>} />
            <Route path="/ConsultaDescuentos" element={<Descuentos/>} />
            <Route path="/ConsultaIngresos" element={<Ingresos/>} />
            <Route path="/Login" element={<Login/>} />
            <Route path="/Dashboard" element={<Dashboard/>} />
            <Route path="/Plazas" element={<Plazas/>} />

          </Routes>
        </Router>
    </div>

  );
}

export default App;


