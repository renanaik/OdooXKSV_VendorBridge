import mongoose from 'mongoose';
import connectDB from './src/config/db';
import User from './src/models/User';
import dotenv from 'dotenv';

dotenv.config();

const debugUser = async () => {
  try {
    await connectDB();
    const users = await User.find({});
    users.forEach(u => console.log(u.name, "->", u.role));
  } catch (err: any) {
    console.error(err);
  } finally {
    process.exit(0);
  }
};

debugUser();
