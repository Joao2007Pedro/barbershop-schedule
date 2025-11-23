import React, { useState } from 'react';
import './Register.css';
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    setError('');
    alert('Cadastro realizado com sucesso!');
  };

  return (
    <div className="container">
      <h2>Cadastro</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            placeholder="Nome"
            required 
          />
        </div>
        <div className="input-field">
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            placeholder="Email"
            required 
          />
        </div>
        <div className="input-field">
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            placeholder="Senha"
            required 
          />
        </div>
        <div className="input-field">
          <input 
            type="password" 
            name="confirmPassword" 
            value={formData.confirmPassword} 
            onChange={handleChange} 
            placeholder="Confirmar Senha"
            required 
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      <div className="signup-link">
        <p>Já tem uma conta? <Link to="/">Voltar para Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
