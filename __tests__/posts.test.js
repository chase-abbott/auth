import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('RESTful routes for user posts', () => {
  let user;
  let agent;
  beforeAll(async () => {
    agent = request.agent(app);
    user = { email: 'cabbott94@gmail.com', password: 'hello' };
    await agent.post('/api/auth/signup').send(user);
    return setup(pool);
  });

  it('adds a new post associated with a user', async () => {
    const post = {
      photoUrl: 'www.me.com/me',
      caption: 'look at me',
      tags: ['sun', 'summer']
    };

    const { body } = await agent.post('/api/posts').send(post);

    expect(body).toEqual({ id: '1', userId: '2', ...post });
  });
});
