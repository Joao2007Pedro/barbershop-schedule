import {FaUser, FaLock} from "react-icons/fa";

import { useState } from "react";

import "./Login.css";

import { Link } from "react-router-dom";



const Login = () => {
    const [username, setUsername] = useState(""); 
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        alert ("Enviando os dados");
    };

  return (
      <div className="container">
        <form onSubmit={handleSubmit}> 
            <h1>Acesso ao Sistema</h1>
            <div className="input-field"> 
            <input 
                type="email" 
                placeholder="E-mail" 
                onChange={(e) => setUsername(e.target.value)}
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

            <button>Entrar</button>

            <div className="signup-link">
                <p>
                Não tem uma conta? <Link to="/Register">Cadastre-se</Link></p>
            </div>
        </form>
      </div>
  )
}

export default Login
 