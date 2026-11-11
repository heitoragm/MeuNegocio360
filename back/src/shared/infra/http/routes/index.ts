import { Router } from 'express';
import { usersRouter } from '@modules/users/infra/http/routes/users.routes';

const routes = Router();

routes.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

routes.use('/users', usersRouter);

export { routes };
