import { Email, Hash, Moment, UserId } from "@primitives"
import { IProduct } from "./item/product"
import { IRecipe } from "./item/recipe"

interface IBDUser {
    id: UserId,
    username: string,
    passwordHash: Hash,
    email: Email,
    moment: Moment
}

interface IUser extends IBDUser {
    featured: Array<IProduct>,
    featuredRecipes: Array<IRecipe>,
    likes: Array<string>
}

export { IBDUser, IUser }
