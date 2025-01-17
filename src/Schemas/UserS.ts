import { Schema, model } from 'mongoose';
import { User } from '../interfaces/User';

const userSchema = new Schema<User>({
    name: {type: String},
    email: {type: String},
    phone: {type: String},
    pass: {type: String},
    owned: { type: [Schema.Types.ObjectId], ref: 'Game', required: true }
  });
  
  export const UserModel = model<User>('User', userSchema);