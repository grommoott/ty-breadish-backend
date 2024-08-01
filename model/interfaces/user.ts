/** Every "Ty Breadish" user... 
 * id: Id<User>
 * username: string
 * passwordHash: Hash
 * email: Email 
 * */
interface IBDUser {
    id: string,
    username: string,
    passwordHash: string,
    email: string,
}
export default IBDUser
