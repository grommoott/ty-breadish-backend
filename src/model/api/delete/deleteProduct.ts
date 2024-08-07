import { ProductId } from "@primitives";
import createDeleteRequest from "./helpers";

const deleteProduct = createDeleteRequest<ProductId>("products", "deleteProduct")

export default deleteProduct

