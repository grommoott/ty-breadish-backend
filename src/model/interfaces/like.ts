/** Interface for BDLike 
 *
 * id: Id<Like>
 * from: Id<User>
 * target: MediaId
 * */
interface IBDLike {
    id: number,
    from: number,
    target: number,
}

/** Interface for Like
 * 
 * id: Id<Like>
 * from: Id<User>
 * target: MediaId
 * */
interface ILike {
    id: number,
    from: number,
    target: number,
}

export { IBDLike, ILike }
