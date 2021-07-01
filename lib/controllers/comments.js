import { Router } from 'express';
import ensureAuth from '../middleware/ensureAuth';
import Comment from '../models/Comment.js';

export default Router()
  .post('/api/comments', ensureAuth, (req, res, next) => {
    Comment.insert(req.user.email, req.body)
      .then(results => res.send(results))
      .catch(next);
  })
  .delete('/api/comments/:id', ensureAuth, (req, res, next) => {
    Comment.delete(req.user.email, req.params.id)
      .then(results => res.send(results))
      .catch(next);
  });
