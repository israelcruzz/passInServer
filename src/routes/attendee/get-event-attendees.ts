import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../../db/prisma";

class GetEventAttendees {
  public async index(request: Request, response: Response) {
    const getAttendeesEventSchema = z.object({
      eventId: z.string().uuid(),
    });

    const getAttendeesEventQuery = z.object({
      query: z.string().nullish(),
      pageIndex: z.string().nullish().default("0").transform(Number),
    });

    const params = getAttendeesEventSchema.parse(request.params);

    const querys = getAttendeesEventQuery.parse(request.query);

    const { eventId } = params;
    const { query, pageIndex } = querys;

    const attendees = await prisma.attendee.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        checkIn: {
          select: {
            createdAt: true,
          },
        },
      },
      where: query
        ? {
            eventId,
            name: {
              contains: query,
            },
          }
        : {
            eventId,
          },
      take: 10,
      skip: pageIndex * 10,
      orderBy: {
        createdAt: "desc",
      },
    });

    return response.status(201).json({
      attendees: attendees.map((attendee) => {
        return {
          id: attendee.id,
          name: attendee.name,
          email: attendee.email,
          createdAt: attendee.createdAt,
          checkedInAt: attendee.checkIn?.createdAt ?? null,
        };
      }),
    });
  }
}

export default new GetEventAttendees();
