import { LikeType } from "@enums"
import { Id, LikeId, UserId } from "@primitives"

interface ILike {
    id: LikeId,
    from: UserId,
    target: Id,
    type: LikeType
}

function queryRowToLike(row: any): ILike {
    if (!("id" in row &&
        "from" in row &&
        "target" in row &&
        "type" in row)) {
        throw new Error("Invalid query row to convert into ILike")
    }

    return {
        id: new LikeId(row.id),
        from: new UserId(row.from),
        target: new Id(row.target),
        type: row.type
    }
}

export { ILike, queryRowToLike }
