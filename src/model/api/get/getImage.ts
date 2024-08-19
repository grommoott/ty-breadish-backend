import bdClient from "@api/bdClient";
import { ImageCategory } from "@enums";
import { pgFormat } from "@helpers";
import { IImage, queryRowToImage } from "@interfaces";
import { ImageId } from "@primitives";
import { QueryResult } from "pg";

export default async function getImage(id: ImageId, category: ImageCategory): Promise<IImage | Error> {
    try {
        const response: QueryResult = await bdClient.query(`select * from images where id=${id} and category='${pgFormat(category)}'`)

        if (response.rowCount == 0) {
            return new Error(`Image with such id(${id}) in category ${category} isn't exists`, { cause: 404 })
        }

        return queryRowToImage(response.rows[0])
    } catch (e) {
        const msg = "Error in getImage request: " + e
        return new Error(msg, { cause: 500 })
    }
}
