import { Router } from "express";
import registerAttendeeInEvent from "./register-for-event";
import getAttendeeBadge from "./get-attendee-badge";
import getEventAttendees from "./get-event-attendees";
import checkIn from "./check-in";

export const attendeeRoutes = Router();

attendeeRoutes.post("/events/:eventId/attendee", registerAttendeeInEvent.store);
attendeeRoutes.get("/attendee/:attendeeId/badge", getAttendeeBadge.index);

attendeeRoutes.get("/attendees/:attendeeId/check-in", checkIn.show);
attendeeRoutes.get("/events/:eventId/attendees", getEventAttendees.index);
