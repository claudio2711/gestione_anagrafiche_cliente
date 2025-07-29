import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import clientRoutes  from './routes/clients.js';

dotenv.config();
connectDB();

const app = express();


app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/clients', clientRoutes);



app.get('/', (_req, res) => res.send('API OK'));


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`In ascolto su :${PORT}`));
