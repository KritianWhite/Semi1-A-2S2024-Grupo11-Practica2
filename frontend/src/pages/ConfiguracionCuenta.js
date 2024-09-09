import React, { useState } from 'react';

import InformacionPersonal from '../components/configuracionCuenta/InformacionPersonal';
import ReconocimientoFacial from '../components/configuracionCuenta/ReconocimientoFacial';
import EliminarCuenta from '../components/configuracionCuenta/EliminarCuenta';

const ConfiguracionCuenta = () => {
    const [usuario, setUsuario] = useState({
        nombre: "Ana García",
        email: "ana.garcia@ejemplo.com",
        reconocimientoFacial: false
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUsuario(prev => ({ ...prev, [name]: value }));
    };

    const handleReconocimientoFacialChange = () => {
        setUsuario(prev => ({ ...prev, reconocimientoFacial: !prev.reconocimientoFacial }));
    };

    const handleGuardarCambios = () => {
        console.log("Guardando cambios:", usuario);
        // Lógica para guardar los cambios en el backend
    };

    const handleEliminarCuenta = () => {
        console.log("Eliminando cuenta...");
        // Lógica para eliminar la cuenta en el backend
    };

    return (
        <>
            <div className="col-md-8">
                <h1 className="text-center mb-6">Configuración de la Cuenta</h1>

                <InformacionPersonal
                    usuario={usuario}
                    handleInputChange={handleInputChange}
                    handleGuardarCambios={handleGuardarCambios}
                />

                <ReconocimientoFacial
                    usuario={usuario}
                    handleReconocimientoFacialChange={handleReconocimientoFacialChange}
                />

                <EliminarCuenta handleEliminarCuenta={handleEliminarCuenta} />
            </div>
        </>
    );
};

export default ConfiguracionCuenta;
