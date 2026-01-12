import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [me, setMe] = useState(null);
  const [error, setError] = useState('');

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const data = await api.get('/api/auth/me');
        if (!active) return;
        setMe(data);
      } catch (err) {
        setError('Sessão expirada. Faça login novamente.');
        logout();
      }
    })();
    return () => { active = false; };
  }, []);

  if (!me && !error) return <div style={{ padding: 16 }}>Carregando...</div>;
  if (error) return <div style={{ padding: 16, color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: 16 }}>
      <h2>Bem-vindo, {me?.name}!</h2>
      <p>Seu papel: {me?.role}</p>
      <button onClick={logout}>Sair</button>
    </div>
  );
}