import { IComment, queryRowToComment } from "@interfaces";
import createSimpleGetRequest from "./helpers";
import { CommentId, MediaId, Moment, UserId } from "@primitives";

const getComment = createSimpleGetRequest<CommentId, IComment>("comments", "Comment", queryRowToComment)

export default getComment
