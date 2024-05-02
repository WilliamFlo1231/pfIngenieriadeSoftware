import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import HorasExtra from './pages/HorasExtra';
import Marcaciones from './pages/Marcaciones';
import AutoGestion from './pages/AutoGestion';
import Marcacion from './pages/Marcacion';

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
          </Routes>
        </Router>
    </div>

  );
}

export default App;
