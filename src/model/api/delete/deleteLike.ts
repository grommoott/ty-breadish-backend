import { LikeId } from "@primitives";
import createDeleteRequest from "./helpers";

const deleteLike = createDeleteRequest<LikeId>("likes", "deleteLike")

export default deleteLike
