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
    expect(user.body).toEqual({ id: 1, email: 'cabbott93@gmail.com' });
  });
});
