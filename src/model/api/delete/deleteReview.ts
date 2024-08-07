import { ReviewId } from "@primitives";
import createDeleteRequest from "./helpers";

const deleteReview = createDeleteRequest<ReviewId>("reviews", "deleteReview")

export default deleteReview
