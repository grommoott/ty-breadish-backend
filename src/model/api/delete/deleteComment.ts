import { CommentId } from "@primitives";
import createDeleteRequest from "./helpers";

const deleteComment = createDeleteRequest<CommentId>("comments", "deleteComment")

export default deleteComment
