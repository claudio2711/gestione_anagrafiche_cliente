import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiFetch } from '../api.js';

export default function Register() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  });
  const [err, setErr] = useState('');

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setErr('Le password non coincidono');
      return;
    }
    try {
      await apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });
      nav('/login');
    } catch (error) {
      setErr(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg"
      >
        <h1 className="text-2xl font-semibold mb-6 text-center">Registrati</h1>

        {[
          { label: 'Nome',      name: 'name',     type: 'text' },
          { label: 'Email',     name: 'email',    type: 'email' },
          { label: 'Password',  name: 'password', type: 'password' },
          { label: 'Conferma',  name: 'confirm',  type: 'password' },
        ].map(f => (
          <div key={f.name} className="mb-4">
            <label className="block mb-1 text-sm font-medium" htmlFor={f.name}>
              {f.label}
            </label>
            <input
              id={f.name}
              name={f.name}
              type={f.type}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={form[f.name]}
              onChange={handleChange}
            />
          </div>
        ))}

        {err && <p className="text-sm text-red-600 mb-2">{err}</p>}

        <button
          className="w-full py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
        >
          Crea account
        </button>

        <p className="text-sm text-center mt-4">
          Hai già un account?{' '}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Accedi
          </Link>
        </p>
      </form>
    </div>
  );
}
