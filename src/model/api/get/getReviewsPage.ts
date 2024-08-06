import bdClient from "@api/bdClient"
import { IBDReview } from "@interfaces/review"
import { ReviewsSortOrder, ReviewsSortOrders } from "@enums"
import config from "@api/config"
import { QueryResult } from "pg"
import { ItemId, ReviewId, UserId } from "@primitives"

export default async function getReviewsPage(itemId: ItemId, sortOrder: ReviewsSortOrder, page: number): Promise<Array<IBDReview> | Error> {
    try {
        const response: QueryResult = await (() => {
            switch (sortOrder) {
                case ReviewsSortOrders.OldFirst:
                    return bdClient.query(`select * from reviews order by moment limit ${config.reviewsPageSize} offset ${config.reviewsPageSize * page}`)

                case ReviewsSortOrders.NewFirst:
                    return bdClient.query(`select * from reviews order by moment desc limit ${config.reviewsPageSize} offset ${config.reviewsPageSize * page}`)

                case ReviewsSortOrders.LikedFirst:
                    return bdClient.query(`select * from reviews order by (select count(*) from likes where target=${itemId} and type='review') desc limit ${config.reviewsPageSize} offset ${config.reviewsPageSize * page}`)

                case ReviewsSortOrders.RatedFirst:
                    return bdClient.query(`select * from reviews order by rate desc limit ${config.reviewsPageSize} offset ${config.reviewsPageSize * page}`)

                case ReviewsSortOrders.UnratedFirst:
                    return bdClient.query(`select * from reviews order by rate limit ${config.reviewsPageSize} offset ${config.reviewsPageSize * page}`)
            }
        })()

        return response.rows.map(review => {
            return {
                id: new ReviewId(review.id),
                target: new ItemId(review.target),
                from: new UserId(review.from),
                content: review.content,
                rate: review.rate
            }
        })
    } catch (e) {
        const msg = "Error in getReviewsPage request " + e
        console.error(msg)
        return new Error(msg, { cause: 500 })
    }
}
