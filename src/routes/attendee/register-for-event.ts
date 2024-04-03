import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../../db/prisma";

class RegisterAttendeeInEvent {
  public async store(request: Request, response: Response) {
    const registerAttendeeSchema = z.object({
      name: z.string(),
      email: z.string().email(),
    });

    const registerAttendeeParams = z.object({
      eventId: z.string().uuid(),
    });

    const data = registerAttendeeSchema.parse(request.body);
    const params = registerAttendeeParams.parse(request.params);
    
    const { name, email } = data;
    const { eventId } = params;

    const attendeeFromEmail = await prisma.attendee.findUnique({
      where: {
        eventId_email: {
          email,
          eventId,
        },
      },
    });

    if (attendeeFromEmail !== null) {
      throw new Error("This e-mail is already registered for this event.");
    }

    const [event, amountOfAttendeesForEvent] = await Promise.all([
      prisma.event.findUnique({
        where: {
          id: eventId,
        },
      }),

      prisma.attendee.count({
        where: {
          eventId,
        },
      }),
    ]);

    if (event?.maxAttendees && amountOfAttendeesForEvent >= event.maxAttendees) {
      throw new Error(
        "The maximum number of attendees for this event has been reached."
      );
    }

    const attendee = await prisma.attendee.create({
        data: {
            name,
            email,
            eventId
        }
    })

    return response.status(201).json({ attendeeId: attendee.id })
  }
}

export default new RegisterAttendeeInEvent();
