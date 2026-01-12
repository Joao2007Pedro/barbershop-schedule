import React, { useState } from 'react';
import './Register.css';
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../services/api";

const Register = () => {
  const navigate = useNavigate();
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

  const handleSubmit = async (e) => {
    e.preventDefault();

      if (formData.password !== formData.confirmPassword) {
        setError('As senhas não coincidem.');
      return;
      }

      try {
        await api.post('/api/auth/register', {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: 'cliente', // TODO: permitir escolha do papel
        });
        alert('Cadastro realizado com sucesso!');
        navigate('/');
      } catch (err) {
        setError('Erro ao cadastrar. Verifique os dados.');
      }
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
