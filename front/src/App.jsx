import Login    from './pages/Login.jsx';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register.jsx';
import Clients  from './pages/Clients.jsx';


export default function App() {
  return(
    <BrowserRouter>
     <Routes>
      <Route path="/login"    element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/clients"  element={<Clients />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
     </Routes>
    
    </BrowserRouter>

  );
}
