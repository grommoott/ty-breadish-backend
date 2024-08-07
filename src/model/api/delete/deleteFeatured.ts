import { FeaturedId } from "@primitives";
import createDeleteRequest from "./helpers";

const deleteFeatured = createDeleteRequest<FeaturedId>("featured", "deleteFeatured")

export default deleteFeatured
