import React from 'react';
import { Lock } from 'react-bootstrap-icons';

const CredencialesForm = ({ credentials, onCredentialsChange, onSubmit }) => {
    return (
        <form onSubmit={onSubmit} className="mb-3">
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Usuario o Correo Electrónico</label>
                <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={credentials.username}
                    onChange={onCredentialsChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={credentials.password}
                    onChange={onCredentialsChange}
                    required
                />
            </div>
            <button type="submit" className="btn btn-dark w-100">
                <Lock className="me-2" /> Iniciar Sesión
            </button>
            <a href="/registro-usuario" className="d-block mt-2 text-left">Registrarse...</a>
        </form>
    );
};

export default CredencialesForm;
