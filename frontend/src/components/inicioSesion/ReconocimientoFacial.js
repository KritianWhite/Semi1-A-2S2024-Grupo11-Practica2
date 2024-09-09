import React from 'react';
import { Camera } from 'react-bootstrap-icons';

const ReconocimientoFacial = ({ isCameraActive, onFacialRecognition }) => {
    return (
        <div>
            <p className="text-muted">Utiliza el reconocimiento facial para iniciar sesión rápidamente.</p>
            {isCameraActive ? (
                <div className="bg-light d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                    <Camera size={48} />
                </div>
            ) : (
                <button onClick={onFacialRecognition} className="btn btn-dark w-100">
                    <Camera className="me-2" /> Activar Cámara
                </button>
            )}
        </div>
    );
};

export default ReconocimientoFacial;
