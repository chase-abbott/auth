import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export default class UserService {
  static async create({ email, password }){
    const passwordHash = await bcrypt.hash(password, Number(process.env.SALT));

    return User.insert({ email, passwordHash });
  }
}
