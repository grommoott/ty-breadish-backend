import { ReviewId } from "@primitives";
import createSimpleGetRequest from "./helpers";
import { IReview, queryRowToReview } from "@interfaces";

const getReview = createSimpleGetRequest<ReviewId, IReview>("reviews", "Review", queryRowToReview)

export default getReview
