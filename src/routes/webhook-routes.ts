import { Router } from 'express';
import { handler, setup } from '../controllers/webhook-controller';

const webhookRouter = Router();

webhookRouter.get('/webhook', setup);
webhookRouter.post('/webhook', handler);

export default webhookRouter;
