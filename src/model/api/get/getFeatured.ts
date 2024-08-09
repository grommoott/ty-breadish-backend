import { FeaturedId } from "@primitives";
import createSimpleGetRequest from "./helpers";
import { IFeatured, queryRowToFeatured } from "@interfaces";

const getFeatured = createSimpleGetRequest<FeaturedId, IFeatured>("featured", "Featured", queryRowToFeatured)

export default getFeatured
