import { LikeId } from "@primitives";
import createSimpleGetRequest from "./helpers";
import { ILike, queryRowToLike } from "@interfaces";

const getLike = createSimpleGetRequest<LikeId, ILike>("likes", "Like", queryRowToLike)

export default getLike
