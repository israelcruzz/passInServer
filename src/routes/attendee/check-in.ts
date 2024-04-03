import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../../db/prisma";

class CheckIn {
  public async show(request: Request, response: Response) {
    const checkInShowSchema = z.object({
      attendeeId: z.coerce.number(),
    });

    const params = checkInShowSchema.parse(request.params);

    const { attendeeId } = params;

    const existCheckInAttendee = await prisma.checkIn.findUnique({
        where: {
            attendeeId
        }
    })

    if(existCheckInAttendee !== null){
        throw new Error('Attendee already checked in!')
    }

    await prisma.checkIn.create({
      data: {
        attendeeId
      }
    })

    return response.status(200).send()
  }
}

export default new CheckIn();
