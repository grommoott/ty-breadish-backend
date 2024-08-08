import { LikeId, NewId } from "@primitives";
import createSimpleGetRequest from "./helpers";
import { INew, queryRowToNew } from "@interfaces";

const getNew = createSimpleGetRequest<NewId, INew>("news", "New", queryRowToNew)
