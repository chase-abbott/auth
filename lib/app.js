import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import userController from '../lib/controllers/users.js';
import postController from '../lib/controllers/posts.js';

const app = express();

app.use(express.json());

app.use(userController);
app.use(postController);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
