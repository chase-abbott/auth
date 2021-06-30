import { Router } from 'express';
import Post from '../models/Post.js';
import ensureAuth from '../middleware/ensureAuth.js';

export default Router()
  .post('/api/posts', ensureAuth, (req, res, next) => {
    Post.insert({ userId: req.user.id, ...req.body })
      .then(post => res.send(post))
      .catch(next);
  })
  .get('/api/posts', ensureAuth, (req, res, next) => {
    Post.selectAll()
      .then(posts => res.send(posts))
      .catch(next);
  });
