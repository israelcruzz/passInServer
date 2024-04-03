import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../../db/prisma";

class GetEvent {
  public async show(request: Request, response: Response) {
    const showEventParams = z.object({
      eventId: z.string().uuid(),
    });

    const params = showEventParams.parse(request.params);

    const { eventId } = params;

    const event = await prisma.event.findUnique({
      select: {
        id: true,
        title: true,
        slug: true,
        details: true,
        maxAttendees: true,
        _count: {
          select: {
            attendees: true,
          },
        },
      },
      where: {
        id: eventId,
      },
    });

    if (event === null) {
      throw new Error("Event not found");
    }

    return response.status(201).json({
      event: {
        id: event.id,
        title: event.title,
        details: event.details,
        slug: event.slug,
        maxAttendees: event.maxAttendees,
        attendeesAmount: event._count.attendees,
      },
    });
  }
}

export default new GetEvent();
