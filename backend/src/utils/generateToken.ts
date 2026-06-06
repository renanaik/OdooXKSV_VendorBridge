import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

const generateToken = (id: Types.ObjectId | string, role: string) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET as string, {
    expiresIn: (process.env.JWT_EXPIRE || '30d') as any,
  });
};

export default generateToken;
