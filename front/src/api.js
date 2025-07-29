const API = 'http://localhost:4000'; 

export const setToken = tok => localStorage.setItem('token', tok);
export const getToken = ()   => localStorage.getItem('token') || '';

export const apiFetch = (path, opts = {}) =>
  fetch(API + path, 
  {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      ...(getToken() && { Authorization: `Bearer ${getToken()}` }),
      ...opts.headers,
    },
  }).then(async r => 
  {
    const data = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(data.msg || 'Errore API');
    return data;
  });
