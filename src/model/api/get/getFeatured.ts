import { QueryResult } from "pg";
import bdClient from "../bdClient.js";
import { IBDFeatured } from "model/interfaces/index.js";

export default async function getFeatured(userId: number): Promise<Array<IBDFeatured> | null> {
    try {
        const response: QueryResult = await bdClient.query(`select * from featured where from=${userId}`)

        const result: Array<IBDFeatured> = new Array<IBDFeatured>()

        for (let featured of response.rows) {
            result.push({
                id: featured.id,
                from: featured.from,
                target: featured.target
            })
        }

        return result

    } catch (e) {
        console.error("Error in getFeatured request:", e)
        return null
    }
}
