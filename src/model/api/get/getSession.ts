import { queryRowToSession } from "@interfaces";
import createSimpleGetRequest from "./helpers";

const getSession = createSimpleGetRequest("sessions", "Session", queryRowToSession)

export { getSession }
