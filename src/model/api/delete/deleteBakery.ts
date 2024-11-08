import { BakeryId } from "@primitives";
import createDeleteRequest from "./helpers";

const deleteBakery = createDeleteRequest<BakeryId>("bakeries", "deleteBakery")

export default deleteBakery
