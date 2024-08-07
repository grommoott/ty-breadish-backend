import { NewId } from "@primitives";
import createDeleteRequest from "./helpers";

const deleteNew = createDeleteRequest<NewId>("news", "deleteNew")

export default deleteNew
