import { Router } from 'express';
import status from 'http-status';

import { state } from '../utils/lifecycle';

const router = Router();

router.get('/ready', (request, response) => {
  if (state.isShuttingDown) {
    return response.sendStatus(status.SERVICE_UNAVAILABLE);
  }

  return response.sendStatus(status.OK);
});

router.get('/', (request, response) => {
  return response.sendStatus(status.OK);
});

export default router;
