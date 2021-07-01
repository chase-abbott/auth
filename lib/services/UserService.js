import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export default class UserService {
  static async create({ email, password }){
    const passwordHash = await bcrypt.hash(password, Number(process.env.SALT));

    return User.insert({ email, passwordHash });
  }

  static async authenticate({ email, password }){

    const user = await User.findEmail(email);

    if(!user){
      throw new Error('Invalid email or password');
    }
    
    const matchingPassword = await bcrypt.compare(password, user.passwordHash);

    if(!matchingPassword){
      throw new Error('Incorrect password');
    }

    return user;
  }
}
