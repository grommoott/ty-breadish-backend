import bdClient from "@api/bdClient";
import getItem from "@api/get/getItem";
import getUser from "@api/get/getUser";
import { ItemType } from "@enums";
import { IFeatured, IItem, IUser, queryRowToFeatured } from "@interfaces";
import { FeaturedId, ItemId, UserId } from "@primitives";
import { QueryResult } from "pg";

export default async function createFeatured(from: UserId, target: ItemId, itemType: ItemType): Promise<IFeatured | Error> {
    try {
        const userWithId: IUser | Error = await getUser(from)

        if (userWithId instanceof Error) {
            return userWithId
        }

        const itemWithId: IItem | Error = await getItem(target)

        if (itemWithId instanceof Error) {
            return itemWithId
        }

        const featureds: QueryResult = await bdClient.query(`select * from featured where "from"=${from} and target=${target}`)

        if (featureds.rowCount != 0) {
            return new Error(`There is already featured from ${from} and with target ${target}`)
        }

        const response: QueryResult = await bdClient.query(`insert into featured values(default, ${from}, ${target}, ${itemType}) returning *`)

        return queryRowToFeatured(response.rows[0])
    } catch (e) {
        const msg = "Error in createFeatured request" + e
        throw new Error(msg, { cause: 500 })
    }
}
