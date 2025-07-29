// back/routes/auth.js
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';


const router = express.Router();

router.post('/register', async (req, res) => 
  {
  const { name, email, password } = req.body;

  const exists = await User.findOne({email});
  if (exists) return res.status(400).json({ msg: 'Utente già esistente' });

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, password: hash });

  res.json({ id: user._id });
});

router.post('/login', async (req, res) =>
  {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const ok   = user && await user.matchPassword(password);
    if (!ok) return res.status(401).json({ msg: 'Credenziali errate' });

     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
     expiresIn: '1d',
  });
  res.json({ token });
  });

export default router;
