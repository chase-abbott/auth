import { Router } from 'express';
import PostService from '../services/PostService.js';
import ensureAuth from '../middleware/ensureAuth.js';

export default Router()
  .post('/api/posts', (req, res, next) => {
    PostService.create(req.body)
      .then(post => res.send(post))
      .catch(next);
  });
