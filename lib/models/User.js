import jwt from 'jsonwebtoken';
import pool from '../utils/pool.js';
import dotenv from 'dotenv';
dotenv.config();

export default class User{
  id;
  email;
  passwordHash;

  constructor(row){
    this.id = row.id;
    this.email = row.email;
    this.passwordHash = row.password_hash;
  }

  static async insert({ email, passwordHash }){
    const { rows } = await pool.query(`
    INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email`
    , [email, passwordHash]);

    return new User(rows[0]);
  }

  authToken(){
    jwt.sign({ ...this }, process.env.APP_SECRET);
  }
}
