import express from "express";
import { eventRoutes } from "./routes/events";
import { attendeeRoutes } from "./routes/attendee";
import swaggerUi from 'swagger-ui-express'
import swaggerJson from '../swagger.json'
import cors from 'cors'

const port = 3030;
const app = express();

app.use(express.json());
app.use(cors())
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));
app.use(eventRoutes)
app.use(attendeeRoutes)

app.listen(port, () => {
  console.log(`👩‍💻Server Online: http://localhost:${port}`);
});