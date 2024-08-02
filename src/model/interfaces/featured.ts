/** Interface for BDFeatured
 * 
 * id: Id<Feature>
 * from: Id<User>
 * target: ItemId
 * */
interface IBDFeatured {
    id: number,
    from: number,
    target: number
}

/** Interface for Featured
 * 
 * id: Id<Feature>
 * from: Id<User>
 * target: ItemId 
 * */
interface IFeatured {
    id: number,
    from: number,
    target: number
}

export { IBDFeatured, IFeatured }
