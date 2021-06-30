import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('signs up a user via POST', async () => {
    const user = { email: 'cabbott93@gmail.com', password: 'hello' };

    const { body } = await request(app).post('/api/auth/signup').send(user);

    expect(body).toEqual({ id: '1', email: 'cabbott93@gmail.com' });
  });
});
