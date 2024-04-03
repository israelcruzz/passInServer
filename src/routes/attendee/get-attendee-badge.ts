import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../../db/prisma";

class GetAttendeeBadge {
  public async index(request: Request, response: Response) {
    const getAttendeeBadgeParams = z.object({
      attendeeId: z.coerce.number().int(),
    });

    const params = getAttendeeBadgeParams.parse(request.params);

    const { attendeeId } = params;

    const attendee = await prisma.attendee.findUnique({
      select: {
        name: true,
        email: true,
        event: {
          select: {
            title: true,
          },
        },
      },
      where: {
        id: attendeeId,
      },
    });

    if (attendee === null) {
      throw new Error("Attendee not found");
    }

    const baseUrl = `${request.protocol}://${request.hostname}:3030`

    const checkInUrl = new URL(`/attendees/${attendeeId}/check-in`, baseUrl)

    return response.status(200).json({
      badge: {
        name: attendee.name,
        email: attendee.email,
        eventTitle: attendee.event,
        checkInUrl: checkInUrl.toString()
      }
    });
  }
}

export default new GetAttendeeBadge();
