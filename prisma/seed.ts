// import { prisma } from "../src/db/prisma";

// interface PromiseType {
//   id: string;
//   title: string;
//   details: string | null;
//   slug: string;
//   maxAttendees: number | null;
// }

// async function seed(): Promise<PromiseType> {
//   return await prisma.event.create({
//     data: {
//       title: "Unite Submit",
//       slug: "unite-submit",
//       details: "Event for devs",
//       maxAttendees: 100,
//     },
//   });
// }

// seed().then(() => {
//     console.log('Database Seeded!');
//     prisma.$disconnect()
// })
