import { Schema, model } from 'mongoose';

export default model(
  'Client',
  new Schema(
    {
      name : { type: String, required: true },
      email: { type: String, required: true, unique: true },
      phone: String,
      note : String,
    },
    { timestamps: true }
  ),
);

