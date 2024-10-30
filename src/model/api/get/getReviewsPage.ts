import bdClient from "@api/bdClient"
import { IItem, IReview, queryRowToReview } from "@interfaces"
import { LikeTypes, ReviewsSortOrder, ReviewsSortOrders } from "@enums"
import config from "@api/config"
import { QueryResult } from "pg"
import { ItemId } from "@primitives"
import getItem from "./getItem"
import { pgFormat } from "@helpers"

export default async function getReviewsPage(itemId: ItemId, sortOrder: ReviewsSortOrder, page: number): Promise<Array<IReview> | Error> {
    try {
        const itemWithId: IItem | Error = await getItem(itemId)

        if (itemWithId instanceof Error) {
            return itemWithId
        }

        const response: QueryResult = await (() => {
            switch (sortOrder) {
                case ReviewsSortOrders.OldFirst:
                    return bdClient.query(`select * from reviews where target=${itemId} order by moment limit ${config.reviewsPageSize} offset ${config.reviewsPageSize * page}`)

                case ReviewsSortOrders.NewFirst:
                    return bdClient.query(`select * from reviews where target=${itemId} order by moment desc limit ${config.reviewsPageSize} offset ${config.reviewsPageSize * page}`)

                case ReviewsSortOrders.LikedFirst:
                    return bdClient.query(`select * from reviews where target=${itemId} order by (select count(*) from likes where target=reviews.item_id and type='${pgFormat(LikeTypes.Review)}') desc limit ${config.reviewsPageSize} offset ${config.reviewsPageSize * page}`)

                case ReviewsSortOrders.RatedFirst:
                    return bdClient.query(`select * from reviews where target=${itemId} order by rate desc limit ${config.reviewsPageSize} offset ${config.reviewsPageSize * page}`)

                case ReviewsSortOrders.UnratedFirst:
                    return bdClient.query(`select * from reviews where target=${itemId} order by rate limit ${config.reviewsPageSize} offset ${config.reviewsPageSize * page}`)
            }
        })()

        return response.rows.map(queryRowToReview)
    } catch (e) {
        const msg = "Error in getReviewsPage request " + e
        throw new Error(msg, { cause: 500 })
    }
}
