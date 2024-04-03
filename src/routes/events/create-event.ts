import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../../db/prisma";
import { generationSlug } from "../../utils/generate-slug";

class CreateEvent {
  public async store(request: Request, response: Response) {
    const createEventSchema = z.object({
      title: z.string().min(4),
      details: z.string().nullable(),
      maxAttendees: z.number().int().positive().nullable(),
    });

    const data = createEventSchema.parse(request.body);

    const { title, details, maxAttendees } = data;

    const slug = generationSlug(title);

    const existSlug = await prisma.event.findUnique({
      where: {
        slug,
      },
    });

    if (existSlug !== null) {
      throw new Error("Another event with same title already exists.");
    }

    const event = await prisma.event.create({
      data: {
        title,
        details,
        maxAttendees,
        slug,
      },
    });

    return response.status(201).json({ eventId: event.id });
  }
}

export default new CreateEvent();
