import { UserId } from "@primitives";
import createDeleteRequest from "./helpers";

const deleteUser = createDeleteRequest<UserId>("users", "deleteUser")

export default deleteUser
