import { IProduct } from "./product"
import { IRecipe } from "./recipe"

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
 * featured: Array<Product>
 * featuredRecipes: Array<Recipe>
 * likes: Array<MediaId>
 * */
interface IUser {
    id: number,
    username: string,
    passwordHash: string,
    email: string,
    moment: number,
    featured: Array<IProduct>,
    featuredRecipes: Array<IRecipe>,
    likes: Array<string>
}

export { IBDUser, IUser }
