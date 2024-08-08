import { ItemId, Moment, ReviewId, UserId } from "@primitives";
import createSimpleGetRequest from "./helpers";
import { IReview, queryRowToReview } from "@interfaces";

const getReview = createSimpleGetRequest<ReviewId, IReview>("reviews", "Review", queryRowToReview)

export default getReview
