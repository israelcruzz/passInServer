import { Router } from 'express';
import createEvent from './create-event';
import getEvent from './get-event';

export const eventRoutes = Router();

eventRoutes.post('/events', createEvent.store)
eventRoutes.get('/events/:eventId', getEvent.show)