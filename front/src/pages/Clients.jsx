import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../api.js';

export default function Clients() {
  const [list, setList]       = useState([]);
  const [selectedId, setId]   = useState(null);
  const [form, setForm]       = useState({ name:'', email:'', phone:'', note:'' });

  const nav = useNavigate();
   
  useEffect(() => {
    if (!localStorage.getItem('token')) nav('/login');
  }, [nav]);
   

  const load = () => apiFetch('/clients').then(setList);
  useEffect(() => { load(); }, []);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (selectedId) {
      await apiFetch('/clients/' + selectedId, {
        method:'PUT',
        body: JSON.stringify(form),
      });
    } else {
      await apiFetch('/clients', {
        method:'POST',
        body: JSON.stringify(form),
      });
    }
    resetForm();
    load();
  };

  const editRow = c => {
    setId(c._id);
    setForm({ name:c.name, email:c.email, phone:c.phone, note:c.note ?? '' });
  };

  const remove = async id => {
    await apiFetch('/clients/' + id, { method:'DELETE' });
    if (id === selectedId) resetForm();
    load();
  };

  const resetForm = () => {
    setId(null);
    setForm({ name:'', email:'', phone:'', note:'' });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Clienti</h2>

      
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap gap-4 items-end bg-white p-4 rounded-lg shadow mb-8"
      >
        {['name','email','phone','note'].map(f => (
          <input key={f}
            name={f}
            placeholder={f}
            required={f!=='note'}
            value={form[f]}
            onChange={handleChange}
            className="flex-1 min-w-[160px] border px-3 py-2 rounded focus:ring-2 focus:ring-indigo-400"
          />
        ))}
        <button className="bg-indigo-600 text-white px-4 py-2 rounded">
          {selectedId ? 'Aggiorna' : 'Salva'}
        </button>
        {selectedId && (
          <button
            type="button"
            onClick={resetForm}
            className="text-sm underline text-gray-600"
          >
            Annulla
          </button>
        )}
      </form>

      
      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="p-2">Nome</th>
              <th className="p-2">Email</th>
              <th className="p-2">Tel</th>
              <th className="p-2">Note</th>
              <th className="p-2 w-12"></th>
            </tr>
          </thead>
          <tbody>
            {list.map(c => (
              <tr key={c._id} className="odd:bg-gray-50 hover:bg-indigo-50">
                <td className="p-2 cursor-pointer" onClick={() => editRow(c)}>
                  {c.name}
                </td>
                <td className="p-2">{c.email}</td>
                <td className="p-2">{c.phone}</td>
                <td className="p-2">{c.note}</td>
                <td className="p-2">
                  <button
                    onClick={() => remove(c._id)}
                    className="opacity-60 hover:opacity-100"
                  >
                    &#x1F5D1;
                  </button>
                </td>
              </tr>
            ))}
            {!list.length && (
              <tr><td colSpan={4} className="p-4 text-center text-gray-500">
                Nessun cliente
              </td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
