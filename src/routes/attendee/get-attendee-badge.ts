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

    return response.status(200).json({ attendee });
  }
}

export default new GetAttendeeBadge();
