import React from 'react';

import PerfilUsuario from '../components/paginaInicio/PerfilUsuario';
import Funcionalidad from '../components/paginaInicio/Funcionalidad';

// Datos de usuario simulados
const usuario = {
    nombre: "Ana García",
    email: "ana.garcia@ejemplo.com",
    imgPerfil: "/api/placeholder/150/150"
};

const PaginaInicio = () => {
    return (
        <>
            <div className="col-md-8">
                <PerfilUsuario usuario={usuario} />
                <div className="row mt-4">
                    <div className="col-md-6">
                        <Funcionalidad icon="settings" texto="Configuración de la cuenta" link="/configuracion-cuenta" />
                    </div>
                    <div className="col-md-6">
                        <Funcionalidad icon="album" texto="Ver álbumes" />
                    </div>
                    <div className="col-md-6">
                        <Funcionalidad icon="edit" texto="Editar álbumes" />
                    </div>
                    <div className="col-md-6">
                        <Funcionalidad icon="upload" texto="Subir imagen" />
                    </div>
                    <div className="col-md-6">
                        <Funcionalidad icon="file-text" texto="Extraer texto" />
                    </div>
                    <div className="col-md-6">
                        <Funcionalidad icon="log-out" texto="Cerrar sesión" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaginaInicio;
