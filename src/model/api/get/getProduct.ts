import { ProductId } from "@primitives";
import createSimpleGetRequest from "./helpers";
import { IProduct, queryRowToProduct } from "@interfaces";

const getProduct = createSimpleGetRequest<ProductId, IProduct>("products", "Product", queryRowToProduct)

export default getProduct
