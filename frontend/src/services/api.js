const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

async function request(path, { method = 'GET', body, headers } = {}) {
  const token = localStorage.getItem('token');
  const finalHeaders = {
    'Content-Type': 'application/json',
    ...(headers || {}),
  };
  if (token) finalHeaders.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: finalHeaders,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }

  // tenta parsear JSON; se vazio, retorna null
  try {
    return await res.json();
  } catch {
    return null;
  }
}

export const api = {
  get: (path, opts) => request(path, { ...opts, method: 'GET' }),
  post: (path, body, opts) => request(path, { ...opts, method: 'POST', body }),
  put: (path, body, opts) => request(path, { ...opts, method: 'PUT', body }),
  del: (path, opts) => request(path, { ...opts, method: 'DELETE' }),
};

export { API_URL };
