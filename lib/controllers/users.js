import { Router } from 'express';
import UserService from '../services/UserService.js';

const fullDay = 1000 * 60 * 60 * 24;

export default Router()
  .post('/api/auth/signup', (req, res, next) => {
    UserService.create(req.body)
      .then(user => {
        res.cookie('session', user.authToken(), {
          httpOnly: true,
          maxAge: fullDay
        });
        res.send(user);})
      .catch(next);
  })
  .post('/api/auth/login', (req, res, next) => {
    UserService.authenticate(req.body)
      .then(user => {
        res.cookie('session', user.authToken(), {
          httpOnly: true,
          maxAge: fullDay
        });
        res.send(user);
      })
      .catch(next);
  });
