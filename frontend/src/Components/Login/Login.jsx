import {FaUser, FaLock} from "react-icons/fa";
import { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../services/api";

const Login = () => {
        const navigate = useNavigate();
        const [email, setEmail] = useState(""); 
        const [password, setPassword] = useState("");

        const handleSubmit = async (e) => {
                e.preventDefault();
                try {
                    const res = await api.post('/api/auth/login', {
                        email,
                        password,
                    });
                    localStorage.setItem('token', res.token);
                    navigate('/dashboard'); // TODO: criar página de dashboard
                } catch (err) {
                    alert('Credenciais inválidas');
                }
        };

  return (
      <div className="container">
        <form onSubmit={handleSubmit}> 
            <h1>Acesso ao Sistema</h1>
            <div className="input-field"> 
            <input 
                type="email" 
                placeholder="E-mail" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <FaUser className="icon" />
            </div>
            <div className="input-field"> 
            <input 
                type="password" 
                placeholder='Senha' 
                onChange={(e) => setPassword(e.target.value)}
            />
            <FaLock className="icon" />
            </div>
            <div className="recall-forget">
                <label>
                    <input type="checkbox" />
                    Lembre de mim
                </label>
                <a href="#">Esqueceu a Senha?</a>
            </div>
            <button type="submit">Entrar</button>
            <div className="signup-link">
                <p>
                Não tem uma conta? <Link to="/register">Cadastre-se</Link></p>
            </div>
        </form>
      </div>
  )
}

export default Login
 