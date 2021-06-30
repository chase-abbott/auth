import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('RESTful routes for user posts', () => {
  let user;
  beforeEach(() => {
    user = { email: 'cabbott93@gmail.com', password: 'hello' };
    return request(app).post('/api/auth/signup').send(user)
      .then(() => setup(pool));
  });

  it('adds a new post associated with a user', async () => {
    const post = {
      user: user.email,
      photoUrl: 'www.me.com/me',
      caption: 'look at me',
      tags: ['sun', 'summer']
    };

    const { body } = await request(app).post('/posts').send(post);

    expect(body).toEqual({ id: 1, ...post });
  });
});
