import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('RESTful comment routes', () => {
  let user;
  let agent;
  let post;
  let postRes;
  beforeAll(async () => {
    agent = request.agent(app);

    user = { email: 'cabbott94@gmail.com', password: 'hello' };
    await agent.post('/api/auth/signup').send(user);

    post = {
      photoUrl: 'www.me.com/me',
      caption: 'look at me',
      tags: ['sun', 'summer']
    };

    postRes = await agent.post('/api/posts').send(post);
  });

  afterAll(() => {
    return setup(pool);
  });

  it('adds a comment to a post', async () => {
    console.log(postRes.body);
    const comment = {
      comment: 'this is sick!'
    };

    return agent.post('/api/comments').send(comment)
      .then(({ body }) => {
        expect(body).toEqual({
          comment_id: '1',
          comment: 'this is sick!',
          post_id: postRes.body.id,
          commentBy: user.email
        });
      });
  });
});
