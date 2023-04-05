import { Schema } from 'mongoose';

export const SchemaUserAddress = new Schema({
  rua: String,
  numero: String,
});

export const SchemaUser = new Schema({
  id: Number,
  email: String,
  first_name: String,
  last_name: String,
  address: [SchemaUserAddress],
  avatar: String,
});
