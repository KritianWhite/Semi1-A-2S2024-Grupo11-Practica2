import React, { useState } from 'react';
import FormularioRegistro from '../components/registro/FormularioRegistro';

const RegistroUsuario = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        profileImage: null
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData(prevState => ({
            ...prevState,
            profileImage: file
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }
        // Aquí iría la lógica para enviar los datos al servidor
        console.log('Datos del formulario:', formData);
        setError('');
    };

    return (
        <>
            <div className="card p-4 shadow-lg" style={{ maxWidth: '500px', width: '100%' }}>
                <h1 className="text-center mb-4">Registro de Usuario</h1>
                {error && <div className="alert alert-danger">{error}</div>}
                <FormularioRegistro
                    formData={formData}
                    handleChange={handleChange}
                    handleImageChange={handleImageChange}
                    handleSubmit={handleSubmit}
                />
            </div>
        </>
    );
};

export default RegistroUsuario;
