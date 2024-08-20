import bdClient from "@api/bdClient"
import { ImageCategories } from "@enums"
import { pgFormat } from "@helpers"
import { IImage, queryRowToImage } from "@interfaces"
import { QueryResult } from "pg"

export default async function createBasicImage(extension: string): Promise<IImage | Error> {
    try {
        const response: QueryResult = await bdClient.query(`insert into images values (default, nextval('image_id'), '${pgFormat(ImageCategories.Images)}', '${pgFormat(extension)}') returning *`)

        return queryRowToImage(response.rows[0])
    } catch (e) {
        const msg = "Error in createBasicImage request: " + e
        return new Error(msg, { cause: 500 })
    }
}
