import * as mongoose from 'mongoose';

export const HotelSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: Number,
  email: String,
  website: String,
  description: String,
  image: String,
});
