import { Router } from 'express';
import UserService from '../services/UserService.js';

export default Router()
  .post('/api/auth/signup', (req, res, next) => {
    UserService.create(req.body)
      .then(user => {
        res.cookie('session', user.authToken(), {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24
        });
        res.send(user);})
      .catch(next);
  });
