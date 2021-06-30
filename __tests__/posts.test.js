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
    
  });

  afterAll(() => {
    return setup(pool);
  });

  it('adds a new post associated with a user', async () => {
    const post = {
      photoUrl: 'www.me.com/me',
      caption: 'look at me',
      tags: ['sun', 'summer']
    };

    const { body } = await agent.post('/api/posts').send(post);

    expect(body).toEqual({ postId: '1', userId: '2', ...post });
  });

  it('gets all posts from the database', async () => {
    return agent.get('/api/posts')
      .then(({ body }) => {
        expect(body).toEqual([{
          postId: '1',
          userId: '2',
          photoUrl: 'www.me.com/me',
          caption: 'look at me',
          tags: ['sun', 'summer']
        }]);
      });
     
  });

  it('gets a single post from the database', async () => {
    const comment = await agent.post('/api/comments').send({
      postId: 1,
      comment: 'this is sick!'
    });
    
    console.log(comment.body);
    
    // need to add comments on join once comment resource is completed
    return request(app).get('/api/posts/1')
      .then(({ body }) => {
        
        expect(body).toEqual({
          postId: '1',
          email: 'cabbott94@gmail.com',
          photoUrl: 'www.me.com/me',
          caption: 'look at me',
          tags: ['sun', 'summer'],
          comments: [{
            commentId: '1',
            comment: 'this is sick!'
          }]
        });
      });
   
  });

  it('updates the caption of a post in the database', async () => {

    const getRes = await agent.get('/api/posts/1');
    const post = getRes.body;
    post.caption = 'look here buddy';
    
    return agent.patch('/api/posts/1')
      .send(post)
      .then(({ body }) => {
        expect(body).toEqual({
          postId: '1',
          userId: '2',
          photoUrl: 'www.me.com/me',
          caption: 'look here buddy',
          tags: ['sun', 'summer']
        });
      });
  });

  it('deletes a post from the database', async () => {
    return agent.delete('/api/posts/1')
      .then(({ body }) => {
        expect(body).toEqual({
          postId: '1',
          userId: '2',
          photoUrl: 'www.me.com/me',
          caption: 'look here buddy',
          tags: ['sun', 'summer']
        });
      });
  });

  it('gets a list of the 10 posts with the most comments', async () => {
    
  });
});
