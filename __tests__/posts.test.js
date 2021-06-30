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

  it('gets all posts from the database', async () => {
    return agent.get('/api/posts')
      .then(({ body }) => {
        expect(body).toEqual([{
          id: '1',
          userId: '2',
          photoUrl: 'www.me.com/me',
          caption: 'look at me',
          tags: ['sun', 'summer']
        }]);
      });
     
  });

  it('gets a single post from the database', async () => {
    // need to add comments on join once comment resource is completed
    return agent.get('/api/posts/1')
      .then(({ body }) => {
        expect(body).toEqual({
          id: '1',
          email: 'cabbott94@gmail.com',
          photoUrl: 'www.me.com/me',
          caption: 'look at me',
          tags: ['sun', 'summer']
        });
      })
      .catch(err => err);
  });

  it('updates the caption of a post in the database', async () => {

    const getRes = await agent.get('/api/posts/1');

    getRes.caption = 'look here buddy';
    return agent.patch('/api/posts/1')
      .then(({ body }) => {
        expect(body).toEqual({
          id: '1',
          userId: '2',
          photoUrl: 'www.me.com/me',
          caption: 'look here buddy',
          tags: ['sun', 'summer']
        });
      });
  });
});
