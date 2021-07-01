import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('RESTful routes for user posts', () => {
  let user;
  let agent;
  beforeEach(async () => {
    setup(pool);
    agent = request.agent(app);
    user = { email: 'cabbott94@gmail.com', password: 'hello' };
    await agent.post('/api/auth/signup').send(user);
  });

  it('adds a new post associated with a user', async () => {
    const post = {
      photoUrl: 'www.me.com/me',
      caption: 'look at me',
      tags: ['sun', 'summer']
    };

    const { body } = await agent.post('/api/posts').send(post);

    expect(body).toEqual({ postId: '1', userId: '1', ...post });
  });

  it('gets all posts from the database', async () => {
    const post = {
      photoUrl: 'www.me.com/me',
      caption: 'look at me',
      tags: ['sun', 'summer']
    };

    await agent.post('/api/posts').send(post);
  
    return agent.get('/api/posts')
      .then(({ body }) => {
        expect(body).toEqual([{
          postId: '1',
          userId: '1',
          photoUrl: 'www.me.com/me',
          caption: 'look at me',
          tags: ['sun', 'summer']
        }]);
      });
     
  });

  it('gets a single post from the database', async () => {
    const post = {
      photoUrl: 'www.me.com/me',
      caption: 'look at me',
      tags: ['sun', 'summer']
    };

    await agent.post('/api/posts').send(post);
    await agent.post('/api/comments').send({
      postId: 1,
      comment: 'this is sick!'
    });
    
    return agent.get('/api/posts/1')
      .then(({ body }) => { 
        expect(body).toEqual({
          postId: '1',
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

    const post = {
      photoUrl: 'www.me.com/me',
      caption: 'look at me',
      tags: ['sun', 'summer']
    };

    const postRes = await agent.post('/api/posts').send(post);
    const newPost = postRes.body;
    newPost.caption = 'look here buddy';
    
    return agent.patch('/api/posts/1')
      .send(newPost)
      .then(({ body }) => {
        expect(body).toEqual({
          postId: '1',
          userId: '1',
          photoUrl: 'www.me.com/me',
          caption: 'look here buddy',
          tags: ['sun', 'summer']
        });
      });
  });
  
  it.skip('gets a list of the 10 posts with the most comments', async () => {
    
    await agent.post('/api/comments').send({
      postId: 1,
      comment: 'this is sick!'
    });
    await agent.post('/api/comments').send({
      postId: 1,
      comment: 'woah'
    });
    await agent.get('/api/posts/1');
      

    await agent.post('/api/posts').send({
      photoUrl: 'www.me.com/me',
      caption: 'look at this',
      tags: ['moon', 'fall']
    });
    await agent.post('/api/comments').send({
      postId: 2,
      comment: 'sup'
    });
    await agent.post('/api/comments').send({
      postId: 2,
      comment: 'yo'
    });
    await agent.get('/api/posts/2');

    return agent.get('/api/popular')
      .then(({ body }) => {
        expect(body).toEqual([
          {
            postId: '1',
            userId: '1',
            caption: 'look here buddy',
            photoUrl: 'www.me.com/me',
            tags: ['sun', 'summer'],
            numberOfComments: '3'
          },
          {
            postId: '2',
            userId: '1',
            caption: 'look at this',
            photoUrl: 'www.me.com/me',
            tags: ['moon', 'fall'],
            numberOfComments: '2'
          }
        ]);
      });
  });

  it.skip('deletes a post from the database', async () => {
    return agent.delete('/api/posts/1')
      .then(({ body }) => {
        expect(body).toEqual({
          postId: '1',
          userId: '1',
          photoUrl: 'www.me.com/me',
          caption: 'look here buddy',
          tags: ['sun', 'summer']
        });
      });
  });

});
