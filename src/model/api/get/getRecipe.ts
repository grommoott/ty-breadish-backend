import { queryRowToRecipe } from "@interfaces";
import createSimpleGetRequest from "./helpers";

const getRecipe = createSimpleGetRequest("recipes", "Recipe", queryRowToRecipe)

export default getRecipe
