import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { Router } from 'express';
import basicAuth from 'express-basic-auth';

import { redis } from '../constants';
import { Queue } from 'bullmq';

const routes = Router();

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/external/api/manager');

routes.use(
  basicAuth({
    challenge: true,
    users: { admin: 'secret' },
  })
);

createBullBoard({
  queues: [new BullMQAdapter(new Queue('example', { connection: redis }))],
  serverAdapter,
});

routes.use(serverAdapter.getRouter());

export default routes;
