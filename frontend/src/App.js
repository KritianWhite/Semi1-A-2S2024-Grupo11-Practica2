import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import './App.css';

import Navbar from './components/Navbar';
import InicioSesion from './pages/InicioSesion';
import RegistroUsuario from './pages/RegistroUsuario';
import PaginaInicio from './pages/PaginaInicio';
import ConfiguracionCuenta from './pages/ConfiguracionCuenta';
import VistaAlbum from './pages/VistaAlbum';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      <Router>
        <Layout isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      </Router>
    </>
  );
}

function Layout({ isAuthenticated, setIsAuthenticated }) {
  const location = useLocation(); // Ahora está dentro de Router

  // Verifica si la ruta actual es de inicio de sesión o registro
  const isAuthPage = location.pathname === '/inicio-sesion' || location.pathname === '/registro-usuario';

  return (
    <>
      <Navbar />
      <div className="container-fluid" style={{ paddingTop: '56px', height: '100vh' }}>
        <div className="row h-100">
          <div className="col d-flex justify-content-center align-items-center">
            <Routes>
              <Route path="/inicio-sesion" element={<InicioSesion setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="/registro-usuario" element={<RegistroUsuario />} />
              <Route path="/pagina-inicio" element={<PaginaInicio />} />
              <Route path="/configuracion-cuenta" element={<ConfiguracionCuenta />} />
              <Route path="/vista-album" element={<VistaAlbum />} />
              {/* Otras rutas que necesitan autenticación */}
              <Route path="*" element={<Navigate to="/inicio-sesion" />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
