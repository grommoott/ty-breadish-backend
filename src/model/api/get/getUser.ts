import { Email, Hash, Moment, UserId } from "@primitives";
import createSimpleGetRequest from "./helpers";
import { IUser, queryRowToUser } from "@interfaces";

const getUser = createSimpleGetRequest<UserId, IUser>("users", "User", queryRowToUser)

export default getUser
