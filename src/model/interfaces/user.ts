import { IProduct } from "./index.js"
import { IRecipe } from "./index.js"

/** Every "Ty Breadish" user... 
 * id: Id<User>
 * username: string
 * passwordHash: Hash
 * email: Email 
 * moment: Moment
 * */
interface IBDUser {
    id: number,
    username: string,
    passwordHash: string,
    email: string,
    moment: number
}
/** Interface for User
 * 
 * id: Id<User>
 * username: string
 * passwordHash: Hash
 * email: Email
 * moment: Moment
 * favourites: Array<Product>
 * favouriteRecipes: Array<Recipe>
 * liked: Array<MediaId>
 * */
interface IUser {
    id: number,
    username: string,
    passwordHash: string,
    email: string,
    moment: number,
    favourites: Array<IProduct>,
    favouriteRecipes: Array<IRecipe>,
    liked: Array<string>
}

export { IBDUser, IUser }
