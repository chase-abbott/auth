import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();


const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.PGSSLMODE && { rejectUnauthorized: false },
});

pool.on('connect', () => console.log('postgres connected'));

export default pool;
