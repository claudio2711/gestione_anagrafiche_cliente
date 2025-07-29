import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('🗄️  MongoDB connesso a', mongoose.connection.name);
  } catch (err) {
    console.error('Errore connessione Mongo:', err.message);
    process.exit(1);
  }
};
