import { Router } from 'express';
import UserService from '../services/UserService.js';

export default Router()
  .post('/api/auth/signup', (req, res, next) => {
    UserService.create(req.body)
      .then(user => res.send(user))
      .catch(next);
  });
