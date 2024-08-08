import { QueryResult } from "pg";
import bdClient from "@api/bdClient.js";
import { IFeatured, IUser, queryRowToFeatured } from "@interfaces";
import { FeaturedId, ItemId, UserId } from "@primitives";
import getUser from "./getUser";

export default async function getUserFeatured(userId: UserId): Promise<Array<IFeatured> | Error> {
    try {
        const userWithId: IUser | Error = await getUser(userId)

        if (userWithId instanceof Error) {
            return userWithId
        }

        const response: QueryResult = await bdClient.query(`select * from featured where "from"=${userId}`)

        return response.rows.map(queryRowToFeatured)

    } catch (e) {
        const msg = "Error in getUserFeatured request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
