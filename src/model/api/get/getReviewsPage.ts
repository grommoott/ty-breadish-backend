import bdClient from "@api/bdClient"
import { IBDReview } from "@interfaces/review"
import { ReviewsSortOrder } from "@enums"
import config from "@api/config"
import { QueryResult } from "pg"

export default async function getReviewsPage(itemId: number, sortOrder: ReviewsSortOrder, page: number): Promise<Array<IBDReview> | Error> {
    try {
        const response: QueryResult = await (() => {
            switch (sortOrder) {
                case ReviewsSortOrder.OldFirst:
                    return bdClient.query(`select * from reviews order by moment limit ${config.reviewsPageSize} offset ${config.reviewsPageSize * page}`)

                case ReviewsSortOrder.NewFirst:
                    return bdClient.query(`select * from reviews order by moment desc limit ${config.reviewsPageSize} offset ${config.reviewsPageSize * page}`)

                case ReviewsSortOrder.RateFirst:
                    return bdClient.query(`select * from reviews order by rate desc limit ${config.reviewsPageSize} offset ${config.reviewsPageSize * page}`)

                case ReviewsSortOrder.LikedFirst:
                    return bdClient.query(`select * from reviews order by (select count(*) from likes where target=${itemId} and type='review') desc limit ${config.reviewsPageSize} offset ${config.reviewsPageSize * page}`)

                case ReviewsSortOrder.UnrateFirst:
                    return bdClient.query(`select * from reviews order by rate limit ${config.reviewsPageSize} offset ${config.reviewsPageSize * page}`)
            }
        })()

        return response.rows.map(review => {
            return {
                id: review.id,
                target: review.target,
                from: review.from,
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
