// back/models/client.js
import { Schema, model } from 'mongoose';

const clientSchema = new Schema({
  name : { type:String, required:true, unique:true },
  email: { type:String, required:true, unique:true },
  phone: String,
  note : String,
}, { timestamps:true });

/* ⬇️  HOOK di normalizzazione */
clientSchema.pre('save', function (next) {
  if (this.isModified('email')) {
    this.email = this.email.trim().toLowerCase();
  }
  next();
});

export default model('Client', clientSchema);
