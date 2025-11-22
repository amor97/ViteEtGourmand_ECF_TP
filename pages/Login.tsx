import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getUsers } from '../services/mockData';
import { Lock, Mail } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = getUsers().find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('vg_currentUser', JSON.stringify(user));
      const state = location.state as { from?: string };
      navigate(state?.from || '/');
    } else {
      setError('Identifiants incorrects');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-center text-3xl font-extrabold text-slate-900">Connexion</h2>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <input type="email" required className="appearance-none rounded-t-md relative block w-full px-3 py-3 border border-gray-300" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" required className="appearance-none rounded-b-md relative block w-full px-3 py-3 border border-gray-300" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-900 hover:bg-slate-800">Se connecter</button>
          <div className="text-center text-xs text-gray-400 mt-4">Admin: admin@vite-gourmand.com / admin</div>
        </form>
      </div>
    </div>
  );
};
export default Login;
