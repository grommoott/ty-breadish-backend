import { IBakery, queryRowToBakery } from "@interfaces";
import createSimpleGetRequest from "./helpers";
import { BakeryId } from "@primitives";

const getBakery = createSimpleGetRequest<BakeryId, IBakery>("bakeries", "Bakery", queryRowToBakery)

export default getBakery

