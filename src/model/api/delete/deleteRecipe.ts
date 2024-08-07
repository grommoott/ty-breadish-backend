import { RecipeId } from "@primitives";
import createDeleteRequest from "./helpers";

const deleteRecipe = createDeleteRequest<RecipeId>("recipe", "deleteRecipe")

export default deleteRecipe
