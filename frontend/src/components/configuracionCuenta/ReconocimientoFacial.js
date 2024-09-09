import React from 'react';
import { Alert, Card, FormCheck } from 'react-bootstrap';
import { CameraFill } from 'react-bootstrap-icons';

const ReconocimientoFacial = ({ usuario, handleReconocimientoFacialChange }) => {
    return (
        <Card className="mb-6">
            <Card.Header>
                <Card.Title>Reconocimiento Facial</Card.Title>
            </Card.Header>
            <Card.Body>
                <div className="d-flex align-items-center mb-3">
                    <FormCheck
                        type="switch"
                        id="reconocimientoFacial"
                        checked={usuario.reconocimientoFacial}
                        onChange={handleReconocimientoFacialChange}
                        label="Activar reconocimiento facial"
                    />
                </div>
                {usuario.reconocimientoFacial && (
                    <Alert variant="info">
                        <CameraFill className="me-2" />
                        <strong>Reconocimiento Facial Activado</strong>
                        <p>Ahora puedes iniciar sesión usando el reconocimiento facial.</p>
                    </Alert>
                )}
            </Card.Body>
        </Card>
    );
};

export default ReconocimientoFacial;
