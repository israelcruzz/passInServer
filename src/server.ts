import express from "express";
import { eventRoutes } from "./routes/events";
import { attendeeRoutes } from "./routes/attendee";

const port = 3030;
const app = express();

app.use(express.json());
app.use(eventRoutes)
app.use(attendeeRoutes)

app.listen(port, () => {
  console.log(`👩‍💻Server Online: http://localhost:${port}`);
});