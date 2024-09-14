import React from 'react';
import { Camera, XCircle } from 'react-bootstrap-icons';
import { Col } from 'react-bootstrap';

const FormularioRegistro = ({ formData, handleChange, handleImageChange, handleSubmit, handleClearImage }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Nombre de usuario</label>
                <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Correo electrónico</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
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
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirmar contraseña</label>
                <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">

                <label htmlFor="profileImage" className="form-label">Imagen de perfil</label>
                <Col className="text-center mb-2 mt-1">
                    <div className='image-container'>
                        <img
                            src={formData.profileImage || "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="}
                            alt="Profile"
                            style={{ width: '50%', aspectRatio: '1/1', borderRadius: '50%' }}
                        />
                    </div>
                </Col>
                <div className="d-flex align-items-center">
                    <input
                        type="file"
                        id="profileImage"
                        name="profileImage"
                        onChange={handleImageChange}
                        className="form-control-file"
                        style={{ display: 'none' }}
                        accept='image/*'
                    />
                    <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={() => document.getElementById('profileImage').click()}
                    >
                        <Camera className="me-2" /> Subir imagen
                    </button>
                    {formData.profileImage && (
                        <div className="d-flex align-items-center">
                            <span className="ms-3 text-muted">
                                {formData.nameImage}
                            </span>
                            <div
                                type="button"
                                className=" btn-outline-danger ms-2"
                                onClick={() => handleClearImage()}
                            >
                                <XCircle className='text-danger' />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <button type="submit" className="btn btn-dark w-100">Registrarse</button>
            <a href="/inicio-sesion" className="d-block mt-2 text-left">Iniciar sesión...</a>
        </form>
    );
};

export default FormularioRegistro;
