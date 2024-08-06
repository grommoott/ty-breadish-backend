import { Email, Hash, Moment, UserId } from "@primitives"
import { IProduct } from "./product"
import { IRecipe } from "./recipe"

/** Every "Ty Breadish" user... 
 * id: UserId
 * username: string
 * passwordHash: Hash
 * email: Email 
 * moment: Moment
 * */
interface IBDUser {
    id: UserId,
    username: string,
    passwordHash: Hash,
    email: Email,
    moment: Moment
}
/** Interface for User
 * 
 * id: UserId
 * username: string
 * passwordHash: Hash
 * email: Email
 * moment: Moment
 * featured: Array<Product>
 * featuredRecipes: Array<Recipe>
 * likes: Array<MediaId>
 * */
interface IUser {
    id: UserId,
    username: string,
    passwordHash: Hash,
    email: Email,
    moment: Moment
    featured: Array<IProduct>,
    featuredRecipes: Array<IRecipe>,
    likes: Array<string>
}

export { IBDUser, IUser }
