import jwt from 'jsonwebtoken';

export default function protect(req, res, next)
{
    const header = req.headers.authorization || '';
    const token  = header.split(' ')[1];
    if (!token) return res.status(401).json({ msg: 'Token mancante' });

     try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ msg: 'Token non valido' });
  }
}
