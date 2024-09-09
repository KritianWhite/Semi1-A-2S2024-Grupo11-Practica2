import React from 'react';
import { Card } from 'react-bootstrap';

const PerfilUsuario = ({ usuario }) => {
    return (
        <>
            <div className="d-flex flex-column align-items-center mb-4">
                <div className="mb-3">
                    <img
                        src={usuario.imgPerfil == null ? usuario.imgPerfil : 'https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png'}
                        alt={usuario.nombre}
                        className="rounded-circle"
                        style={{ width: '150px', height: '150px' }}
                    />
                </div>
                <div>
                    <h1>{usuario.nombre}</h1>
                    <p className="text-muted">{usuario.email}</p>
                    <Card className="w-100">
                        <Card.Header>Información del Usuario</Card.Header>
                        <Card.Body>
                            <p>Aquí añadir más detalles del usuario como biografía, fecha de registro, etc.</p>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default PerfilUsuario;
