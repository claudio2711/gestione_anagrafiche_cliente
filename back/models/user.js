// back/models/user.js
import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
  name    : String,
  email   : { type: String, required: true, unique: true },
  password: { type: String, required: true },
});


userSchema.methods.matchPassword = function (plain) {
  return bcrypt.compare(plain, this.password);
};

export default model('User', userSchema);
