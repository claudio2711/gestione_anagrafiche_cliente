 
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiFetch, setToken } from '../api.js';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [setErr] = useState('');
  const nav = useNavigate();

const handleSubmit = async e => 
  {
    e.preventDefault();
    try 
    {
      const res = await apiFetch('/auth/login', {
       method: "POST",
       body: JSON.stringify({email, password}), 
        });
      setToken(res.token);
      nav('/clients');
    } catch (err) 
    {
      setErr(err.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg"
      >
        <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
        >
          Entra
        </button>
        <p className="text-sm text-center mt-4">
          Non hai un account?{' '}
          <Link to="/register" className="text-indigo-600 hover:underline">
          Registrati
          </Link>
        </p>
        
      </form>
    </div>
  );
}
