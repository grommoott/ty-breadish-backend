/** Interface for BDComment 
 *
 * id: Id<Comment>
 * mediaId: MediaId
 * from: Id<User>
 * content: string
 * moment: Moment
 * */
interface IBDComment {
    id: string,
    mediaId: string,
    from: number,
    content: string,
    moment: number
}

export default IBDComment
