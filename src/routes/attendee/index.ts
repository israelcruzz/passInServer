import { Router } from 'express';
import registerAttendeeInEvent from './register-for-event';
import getAttendeeBadge from './get-attendee-badge';

export const attendeeRoutes = Router();

attendeeRoutes.post('/events/:eventId/attendee', registerAttendeeInEvent.store)
attendeeRoutes.get('/attendee/:attendeeId/badge', getAttendeeBadge.index)