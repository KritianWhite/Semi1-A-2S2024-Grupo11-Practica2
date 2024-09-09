import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

import CredencialesForm from '../components/inicioSesion/CredencialesForm';
import ReconocimientoFacial from '../components/inicioSesion/ReconocimientoFacial';

const InicioSesion = ({ setIsAuthenticated }) => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [isCameraActive, setIsCameraActive] = useState(false);

    const handleCredentialsChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
    };

    const handleCredentialsSubmit = (e) => {
        e.preventDefault();
        // Lógica para verificar las credenciales
        setIsAuthenticated(true);
        console.log('Intentando iniciar sesión con:', credentials);
        //setError('Credenciales incorrectas. Por favor, inténtelo de nuevo.');
    };

    const handleFacialRecognition = () => {
        setIsCameraActive(true);
        console.log('Iniciando reconocimiento facial...');
    };

    return (
        <>
            <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
                <h1 className="text-center mb-4">Inicio de Sesión</h1>
                {error && <div className="alert alert-danger">{error}</div>}

                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="credentials-tab" data-bs-toggle="tab" data-bs-target="#credentials" type="button" role="tab">Credenciales</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="facial-tab" data-bs-toggle="tab" data-bs-target="#facial" type="button" role="tab">Reconocimiento Facial</button>
                    </li>
                </ul>

                <div className="tab-content mt-3" id="myTabContent">
                    <div className="tab-pane fade show active" id="credentials" role="tabpanel">
                        <CredencialesForm
                            credentials={credentials}
                            onCredentialsChange={handleCredentialsChange}
                            onSubmit={handleCredentialsSubmit}
                        />
                    </div>
                    <div className="tab-pane fade" id="facial" role="tabpanel">
                        <ReconocimientoFacial isCameraActive={isCameraActive} onFacialRecognition={handleFacialRecognition} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default InicioSesion;
